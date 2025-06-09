# ChatZone

A modern, real-time chat application built with React, TypeScript, and WebSockets.

![ChatZone Screenshot](https://i.imgur.com/example.png)

## Features

- Real-time messaging
- Room-based chat system
- Typing indicators
- User presence notifications
- Modern UI with responsive design

## Technologies Used

This project is built with:

- **Frontend**:
  - React
  - TypeScript
  - Tailwind CSS
  - shadcn/ui components
  - Vite

- **Backend**:
  - Node.js
  - WebSockets (ws)
  - TypeScript

## Deployment Guide

This project is designed to be deployed with:
- Backend on Glitch.com
- Frontend on Vercel

### Quick Deployment Steps

1. **Backend (Glitch.com)**:
   - Create a new project on Glitch.com
   - Import the `backend` directory from your repository
   - Note the URL of your Glitch project (e.g., `https://your-project-name.glitch.me`)

2. **Frontend (Vercel)**:
   - Push your code to a GitHub repository
   - Create a new project on Vercel and import your repository
   - Set the environment variable `VITE_WS_URL` to `wss://your-project-name.glitch.me`
   - Deploy the project

3. **Connect Frontend to Backend**:
   - Ensure the WebSocket URL in your frontend's environment variables points to your Glitch.com backend
   - Test the connection by sending messages between clients

For detailed instructions, see the README files in the `frontend` and `backend` directories.

## Project Structure

- `/frontend` - React frontend application
- `/backend` - WebSocket server implementation

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```sh
git clone <repository-url>
cd ChatZone
```

2. Install dependencies:

```sh
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Running the Application

1. Start the backend server:
```sh
cd backend
npm run dev
```

2. Start the frontend development server:
```sh
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:8000`

## License

This project is licensed under the MIT License.
