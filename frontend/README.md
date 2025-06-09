# ChatZone Frontend

Real-time chat application frontend built with React, TypeScript, and WebSockets.

## Features

- Real-time messaging with WebSockets
- Room-based chat system
- User presence notifications
- Typing indicators
- Modern UI with Tailwind CSS

## Technologies Used

- React
- TypeScript
- WebSockets
- Tailwind CSS
- Vite

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```sh
npm install
```

3. Create a `.env` file based on `.env.example`:
```sh
cp .env.example .env
```

4. Update the `VITE_WS_URL` in the `.env` file with your WebSocket server URL.

### Development

Run the development server:
```sh
npm run dev
```

## Deployment on Vercel

1. Fork or push your project to a GitHub repository
2. Sign up/login to Vercel (https://vercel.com)
3. Connect your GitHub account to Vercel
4. Import your repository
5. Configure the project:
   - Framework preset: Vite
   - Build command: npm run build
   - Output directory: dist
6. Add environment variable:
   - Name: `VITE_WS_URL`
   - Value: Your Glitch WebSocket URL, e.g., `wss://your-project-name.glitch.me`
7. Deploy

### Important Notes

- Make sure your Glitch.com backend is properly configured and running
- The WebSocket connection URL must be set in the environment variables on Vercel
- Use the secure WebSocket protocol (wss://) when deploying to production
