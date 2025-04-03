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
        bunx gel migrate -I $instance_name -b ${!gel_branch}
    else
        echo "Schema is not empty. Skipping migrations."
    fi

    # Check if auth config is empty
    if is_auth_config_empty; then
        echo "Auth config is empty. Configuring auth..."
        bunx tsx ./deploy/auth-initialize.ts
    else
        echo "Auth config is not empty. Skipping auth configuration."
    fi
}

main;