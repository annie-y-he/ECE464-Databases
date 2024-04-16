#!/usr/bin/bash

# Set the project name
PROJECT_NAME="sqlib"

if [ "$1" = "rm" ]; then
  echo "Stopping and removing containers..."
  sudo docker compose -p $PROJECT_NAME down -v
elif [ $1 = "db" ]; then
  sudo docker exec -it ${PROJECT_NAME}-db-1 env PGPASSWORD='inkcherry' psql -U annie -d lib
elif [ $1 = "app" ]; then
  sudo docker exec -it ${PROJECT_NAME}-app-1 bash
else
  echo "Starting services..."
  sudo docker compose -p $PROJECT_NAME up -d
  echo "Containers are running in the background."
fi
echo "Exec into mysql with:"
echo "./docker.sh db"
echo "Exec into node container with:"
echo "./docker.sh app"
echo "When done, you can stop and clean up with:"
echo "./docker.sh rm"