#!/usr/bin/env bash
set -o errexit
set -o pipefail
set -o nounset

echo "Storage ready, running migrations and code generation."

./maybe-initialize-database.sh
bunx gel migrate
bun generate:all