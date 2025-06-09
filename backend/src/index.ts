import { WebSocketServer, WebSocket } from "ws";
import http from "http";
import cors from "cors";
import express from "express";

// Create Express app for handling HTTP
const app = express();
app.use(cors());

// Add a health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'ChatZone WebSocket Server is running' });
});

// Create HTTP server
const server = http.createServer(app);

// Use environment variable for port or default to 8080
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080;

// Create WebSocket server using the HTTP server
const wss = new WebSocketServer({ server });

interface User {
    socket: WebSocket,
    room: string,
    username: string
}

interface ChatMessage {
    type: string;
    payload: {
        roomId?: string;
        username?: string;
        message?: string;
    };
}

let allSocket: User[] = [];

wss.on('connection', (socket: WebSocket) => {

    socket.on("message", (message) => {
        try {
            const parsedData: ChatMessage = JSON.parse(message.toString());

            if (parsedData.type === 'join') {
                if (!parsedData.payload.roomId || !parsedData.payload.username) {
                    console.error("Invalid join message: missing roomId or username");
                    return;
                }

                allSocket = allSocket.filter(user => user.socket !== socket);

                allSocket.push({
                    socket,
                    room: parsedData.payload.roomId,
                    username: parsedData.payload.username
                });

                try {
                        socket.send(JSON.stringify({
                        text: `You joined room ${parsedData.payload.roomId}`,
                        sender: "System"
                    }));
                    const joinMessage = JSON.stringify({
                        text: `${parsedData.payload.username} has joined the room`,
                        sender: "System"
                    });

                    // Send join message to all other users in the room
                    for (const user of allSocket) {
                        if (user.room === parsedData.payload.roomId && user.socket !== socket) {
                            try {
                                user.socket.send(joinMessage);
                            } catch (err) {
                                console.error(`Error sending join message to ${user.username}:`, err);
                            }
                        }
                    }
                } catch (err) {
                    console.error("Error sending join confirmation:", err);
                }
            }

            if (parsedData.type === 'chat') {
                if (!parsedData.payload.message) {
                    console.error("Invalid chat message: missing message content");
                    return;
                }

                const sender = allSocket.find(user => user.socket === socket);

                if (!sender) {
                    try {
                        socket.send(JSON.stringify({
                            text: "You need to join a room before sending messages.",
                            sender: "System"
                        }));
                    } catch (err) {
                        console.error("Error sending error message:", err);
                    }
                    return;
                }

                const currentUserRoom = sender.room;

                // Handle typing indicator separately
                if (parsedData.payload.message === '__TYPING__') {
                    // Send typing indicator to other users in the room
                    for (let i = 0; i < allSocket.length; i++) {
                        if (allSocket[i].room === currentUserRoom && allSocket[i].socket !== socket) {
                            try {
                                allSocket[i].socket.send(JSON.stringify({
                                    text: '__TYPING__',
                                    sender: sender.username
                                }));
                            } catch (err) {
                                console.error(`Error sending typing indicator to user ${allSocket[i].username}:`, err);
                            }
                        }
                    }
                    return; // Don't process further for typing indicators
                }

                // Handle regular messages
                const messageWithSender = JSON.stringify({
                    text: parsedData.payload.message,
                    sender: sender.username
                });

                let recipientCount = 0;
                for (let i = 0; i < allSocket.length; i++) {
                    if (allSocket[i].room === currentUserRoom) {
                        try {
                            allSocket[i].socket.send(messageWithSender);
                            recipientCount++;
                        } catch (err) {
                            console.error(`Error sending message to user ${allSocket[i].username}:`, err);
                        }
                    }
                }

            }
        } catch (err) {
            try {
                socket.send(JSON.stringify({
                    text: "Error processing your message. Please try again.",
                    sender: "System"
                }));
            } catch (sendErr) {
                console.error("Error sending error message:", sendErr);
            }
        }
    });

    socket.on("close", () => {
        // Find the user who disconnected
        const disconnectedUser = allSocket.find(user => user.socket === socket);

        if (disconnectedUser) {
            const { room, username } = disconnectedUser;

            // Remove the user from the list
            allSocket = allSocket.filter(user => user.socket !== socket);

            // Notify other users in the same room
            const leaveMessage = JSON.stringify({
                text: `${username} has left the room`,
                sender: "System"
            });

            // Send leave message to all users in the room
            for (const user of allSocket) {
                if (user.room === room) {
                    try {
                        user.socket.send(leaveMessage);
                    } catch (err) {
                        console.error(`Error sending leave message to ${user.username}:`, err);
                    }
                }
            }
        } else {
            // Just remove the socket if user wasn't found
            allSocket = allSocket.filter(user => user.socket !== socket);
        }
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`WebSocket server is running on port ${PORT}`);
});
