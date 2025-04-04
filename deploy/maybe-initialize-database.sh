#!/usr/bin/env bash
set -o errexit
set -o pipefail
# set -o nounset

# Load .env.development file if it exists
if [ -f .env.development ]; then
    export $(cat .env.development | grep -v '^#' | xargs)
else
    echo ".env.development file not found"
fi

# Load .env file if it exists, 会覆盖 .env.development
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
else
    echo ".env file not found"
fi

# Function to check if a variable exists and is not empty
check_env_var() {
    local var_name="$1"
    if [ -z "${!var_name}" ]; then
        echo "❌ $var_name is not set or empty"
        return 1
    else
        echo "✅ $var_name is set."
        return 0
    fi
}

timestamp=$(date +%s)
instance_name="sv-gel-auth-$timestamp"
gel_instance=GEL_INSTANCE
gel_secret_key=GEL_SECRET_KEY
gel_branch=GEL_BRANCH

# This script is used to configure the database for the first time. It checks if the database is
# brand new by seeing if the current schema is empty and the required auth configuration is also
# empty. If so, it will run migrations, and configure auth.
is_schema_empty() {
    local result
    result=$(bunx gel migration log --from-db -I $instance_name -b $gel_branch)
    if [ "$result" = "<no migrations>" ]; then
        return 0
    else
        return 1
    fi
}

is_auth_config_empty() {
    local result
    result=$(bunx gel query "select ext::auth::signing_key_exists();" -I $instance_name -b $gel_branch)
    if [ "$result" = "true" ]; then
        return 1
    else
        return 0
    fi
}

main() {
    if check_env_var $gel_branch; then
        echo "GEL_BRANCH is set to ${!gel_branch}"
        gel_branch=${!gel_branch}
    else
        echo "GEL_BRANCH is not set. Using default main branch."
        gel_branch="main"
    fi

    if check_env_var $gel_instance; then
        bunx gel project unlink
        instance_name=${!gel_instance}
        # bunx gel cloud login --cloud-secret-key ${!gel_secret_key} 
        bunx gel project init --link --server-instance $instance_name --non-interactive --cloud-secret-key ${!gel_secret_key}
    else
        echo "NO Need to Gel Cloud Instance Config"
        gel_credentials_file=GEL_CREDENTIALS_FILE
        if check_env_var $gel_credentials_file; then
            bunx gel project unlink
            bunx gel instance link --credentials-file ${!gel_credentials_file} --trust-tls-cert --non-interactive $instance_name
            bunx gel project init --link --server-instance $instance_name
        else
            echo "NO Need to GEL_CREDENTIALS_FILE Config"
            gel_dsn=GEL_DSN
            if check_env_var $gel_dsn; then
                bunx gel project unlink
                bunx gel instance link --dsn ${!gel_dsn} --trust-tls-cert --non-interactive $instance_name
                bunx gel project init --link --server-instance $instance_name
            else
                instance_name=$(bunx gel project info --instance-name)
                echo "NO Need to GEL_DSN Config"
            fi
        fi
    fi
    
    # Check if the schema is empty
    if is_schema_empty; then
        echo "Schema is empty. Running migrations..."
        bunx gel migrate -I $instance_name -b ${gel_branch}
    else
        echo "Schema is not empty. Skipping migrations."
    fi

    # Check if auth config is empty
    if is_auth_config_empty; then
        echo "Auth config is empty. Configuring auth..."
        bunx run ./deploy/auth-initialize.ts
    else
        echo "Auth config is not empty. Skipping auth configuration."
    fi

    # Generate types for Client Query(optional)
    bun generate:all;
}

main;