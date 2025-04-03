#!/usr/bin/env bash
set -o errexit
set -o pipefail
set -o nounset

echo "Storage ready, running migrations and code generation."

bash ./maybe-initialize-database.sh
bun generate:all