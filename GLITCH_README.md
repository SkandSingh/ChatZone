# ChatZone Backend on Glitch

This is the backend service for the ChatZone application running on Glitch.com.

## Important Note

This repository contains both frontend and backend code, but on Glitch.com we're ONLY running the backend component.

## How It Works

- The server runs from the `backend` directory
- Configuration is managed by `glitch.json` in the root directory
- WebSocket server runs on the port provided by Glitch (environment variable)
- The frontend should be deployed separately on a service like Vercel

## Testing the WebSocket Server

1. Check the Logs to ensure the server is running
2. Visit the project URL to see the health check response
3. Use the test client: Run `cd backend && npm run test-client` in the Glitch terminal

## Environment Variables

The WebSocket server uses the following environment variables:
- `PORT`: Automatically set by Glitch

## Frontend Connection

Your frontend should connect to this WebSocket server using:
`wss://your-glitch-project-name.glitch.me`
