#!/bin/bash
# This script helps Glitch run only the backend part of the project

echo "Starting ChatZone backend..."

# Change to the backend directory
cd backend

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Build the TypeScript code
echo "Building TypeScript..."
npm run build

# Start the server
echo "Starting server..."
npm start
