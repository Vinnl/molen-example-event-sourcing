#!/bin/bash
set -e

PGDATABASE=molen_example_db;
export PGDATABASE;

echo "Initialising database \`${PGDATABASE}\`";
# Create the database for this stack if it doesn't exist yet (it shouldn't, but to be complete):
psql --dbname=postgres -c "CREATE DATABASE ${PGDATABASE};";
