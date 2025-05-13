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
