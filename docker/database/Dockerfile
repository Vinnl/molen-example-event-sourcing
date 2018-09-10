FROM postgres:10.1-alpine
LABEL Name="Molen example app dev database" \
      Version="0.0.0"

# Initialise databases
# Note: The Postgres Docker image is set up to only run the initialisation scripts
#       upon initialisation of the volume. Therefore, if you add or modify them,
#       be sure to run `docker-compose rm -v` first
#       (although do note that this will remove everything currently in your database).
#       More info: https://github.com/docker-library/postgres/issues/193#issuecomment-313803409
COPY ["docker/database/init_db.sh", "/docker-entrypoint-initdb.d/init-db.sh"]
