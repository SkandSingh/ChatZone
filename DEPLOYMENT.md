# ChatZone Deployment Guide

This document provides step-by-step instructions for deploying the ChatZone application with:
- Backend on Glitch.com
- Frontend on Vercel

## Prerequisites

- GitHub account
- Glitch.com account
- Vercel account

## 1. Backend Deployment to Glitch.com

### Option 1: GitHub Import

1. Create a new project on Glitch.com
2. Click "New Project" > "Import from GitHub"
3. Enter your repository URL (include /backend at the end)

### Option 2: Manual Upload

1. Create a new project on Glitch.com
2. Open the project and delete all files
3. Upload all files from the backend directory
4. Wait for the project to automatically build and start

### Verification

1. Check the Glitch.com logs to ensure the server is running
2. Visit the project URL to verify the health check endpoint responds
3. Note your Glitch.com project URL (e.g., `https://your-project-name.glitch.me`)

## 2. Frontend Deployment to Vercel

### Step 1: Prepare Environment Variables

1. Create a `.env` file in the frontend directory:
```
VITE_WS_URL=wss://your-glitch-project.glitch.me
```

### Step 2: Deploy to Vercel

1. Push your project to GitHub
2. Log in to Vercel and create a new project
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Vite
   - Root Directory: frontend
   - Build Command: npm run build
   - Output Directory: dist
5. Add environment variables:
   - Name: `VITE_WS_URL`
   - Value: `wss://your-glitch-project.glitch.me`
6. Deploy the project

## 3. Testing the Deployment

1. Visit your Vercel deployment URL
2. Create a room and join it
3. Open another browser or incognito window
4. Join the same room with a different username
5. Send messages to verify real-time communication

## 4. Common Issues and Solutions

### CORS Issues:
- Verify the backend is properly configured with CORS
- Make sure the WebSocket URL is correct in the frontend environment variables

### Connection Errors:
- Check if the Glitch.com project is awake (they sleep after inactivity)
- Verify your WebSocket URL starts with `wss://` for secure connections

### Authentication Errors:
- Reset deployment tokens if needed
- Check repository permissions

## 5. Maintenance

### Backend Updates:
1. Push changes to your GitHub repository
2. Glitch.com will automatically update (if using GitHub import)
3. Or manually copy updated files to your Glitch.com project

### Frontend Updates:
1. Push changes to your GitHub repository
2. Vercel will automatically rebuild and deploy
