#!/bin/sh
echo "Waiting for MySQL..."

until nc -z -v -w30 $DB_HOST $DB_PORT
do
  echo "Waiting for database connection at $DB_HOST:$DB_PORT..."
  sleep 2
done

echo "Database is up - executing app startup..."
exec "$@"
