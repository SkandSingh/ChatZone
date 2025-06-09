# ChatZone Backend

WebSocket server for the ChatZone real-time chat application.

## Features

- Real-time messaging with WebSockets
- Room-based chat system
- User presence notifications
- Typing indicators

## Technologies Used

- Node.js
- WebSockets (ws)
- TypeScript

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```sh
npm install
```

## Deployment on Glitch.com

1. Create a new project on Glitch.com
2. Import your repository or upload the backend files
3. The server will automatically start using the start script in package.json
4. Note the URL provided by Glitch.com (will be used in the frontend configuration)

### Environment Variables on Glitch.com

Add the following environment variables in your Glitch.com project settings:
- `PORT`: This will be automatically set by Glitch

### Running the Server

Start the development server:
```sh
npm run dev
```

The WebSocket server will start on port 8080.

## API

### WebSocket Messages

The server accepts the following message types:

#### Join Room
```json
{
  "type": "join",
  "payload": {
    "roomId": "room-id",
    "username": "username"
  }
}
```

#### Send Message
```json
{
  "type": "chat",
  "payload": {
    "message": "Hello, world!"
  }
}
```

#### Typing Indicator
```json
{
  "type": "chat",
  "payload": {
    "message": "__TYPING__"
  }
}
```

## License

This project is licensed under the MIT License.
