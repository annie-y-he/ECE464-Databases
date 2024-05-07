#!/usr/bin/bash

# Set the project name
PROJECT_NAME="sqlib"

if [ "$1" = "rm" ]; then
  echo "Stopping and removing containers..."
  sudo docker compose -p $PROJECT_NAME down -v
elif [ "$1" = "db" ]; then
  sudo docker exec -it ${PROJECT_NAME}-db-1 env PGPASSWORD='inkcherry' psql -U annie -d lib
elif [ "$1" = "app" ]; then
  sudo docker exec -it ${PROJECT_NAME}-app-1 bash
elif [ "$1" = "push" ]; then
  if [ "$2" ]; then
    git add .
    git commit -m "$2"
    git push
  else
    git add .
    git commit -m "update"
    git push
  fi
  rsync -v ./next/.env.remote admin@ec2-18-215-72-38.compute-1.amazonaws.com:/home/admin/databases/next/.env.local
  ssh admin@ec2-18-215-72-38.compute-1.amazonaws.com "cd databases && git pull && ./docker.sh restart"
elif [ "$1" = "restart" ]; then
  # echo "Rebuilding images..."
  # sudo docker compose -p $PROJECT_NAME up -d --build
  # echo "Installing dependencies..."
  # sudo docker exec ${PROJECT_NAME}-app-1 npm install
  echo "Building the application..."
  sudo docker exec ${PROJECT_NAME}-app-1 npm run build
  echo "Generating schema..."
  sudo docker exec ${PROJECT_NAME}-app-1 bash -c "npx prisma generate"
  echo "Deploying migration..."
  sudo docker exec ${PROJECT_NAME}-app-1 bash -c "npx prisma migrate deploy"
  echo "Seeding database..."
  sudo docker exec ${PROJECT_NAME}-app-1 bash -c "npx prisma db seed"
  echo "Restarting container..."
  sudo docker compose -p $PROJECT_NAME restart
  echo "Starting nextjs..."
  sudo docker exec -d ${PROJECT_NAME}-app-1 npm run start
  # echo "No need to restart..." 
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