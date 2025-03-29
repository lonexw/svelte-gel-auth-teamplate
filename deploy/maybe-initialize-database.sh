#!/usr/bin/env bash
set -o errexit
set -o pipefail
set -o nounset

timestamp=$(date +%s)
instance_name="sv-gel-auth-$timestamp"

# This script is used to configure the database for the first time. It checks if the database is
# brand new by seeing if the current schema is empty and the required auth configuration is also
# empty. If so, it will run migrations, and configure auth.
is_schema_empty() {
    local result
    result=$(pnpm exec gel migration log --from-db -I $instance_name)
    if [ "$result" = "<no migrations>" ]; then
        return 0
    else
        return 1
    fi
}

is_auth_config_empty() {
    local result
    result=$(pnpm exec gel query "select ext::auth::signing_key_exists();" -I $instance_name)
    if [ "$result" = "true" ]; then
        return 1
    else
        return 0
    fi
}

main() {
    # Link to the database instance
    pnpm exec gel instance link --credentials-file ./deploy/credentials.json --trust-tls-cert --non-interactive $instance_name
    # Check if the schema is empty
    if is_schema_empty; then
        echo "Schema is empty. Running migrations..."
        pnpm exec gel migrate -I $instance_name
    else
        echo "Schema is not empty. Skipping migrations."
    fi

    # Check if auth config is empty
    if is_auth_config_empty; then
        echo "Auth config is empty. Configuring auth..."
        pnpm exec tsx ./deploy/auth-initialize.ts
    else
        echo "Auth config is not empty. Skipping auth configuration."
    fi
}

main;