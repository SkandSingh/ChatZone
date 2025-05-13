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
