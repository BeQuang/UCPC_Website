#!/bin/sh
echo "Starting script..."
if [ ! -f /app/initialized ]; then
  echo "Running migrations and seeds..."
  until npx sequelize db:migrate && npx sequelize db:seed:all
  do
    echo "Migration failed, retrying in 1 secs..."
    sleep 1
  done
  touch /app/initialized
  echo "Initialization complete."
fi
echo "Starting application..."
npm start