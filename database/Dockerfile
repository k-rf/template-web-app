FROM postgres:14

USER postgres
COPY --chown=postgres:postgres ./database/init.sh /docker-entrypoint-initdb.d/init.sh

EXPOSE 5432
