#!/bin/bash

# Check if the argument is provided
if [ $# -eq 0 ]; then
  echo "Usage: $0 <migration-number>"
  exit 1
fi

# Format the migration file name based on the input integer
MIGRATION_NUMBER=$(printf "%03d" $1)
MIGRATION_FILE="src/db/migrations/${MIGRATION_NUMBER}_*.sql"

# Database credentials
DB_USER="lewis"
DB_NAME="test_db"

# Execute the migration file against the PostgreSQL database
psql -U $DB_USER -d $DB_NAME -a -f $MIGRATION_FILE
