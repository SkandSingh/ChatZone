const WebSocket = require('ws');

// Update this URL with your actual Glitch.com URL when testing
const serverUrl = process.env.WS_URL || 'ws://localhost:8080';

// Create a new WebSocket connection
const ws = new WebSocket(serverUrl);

// Connection opened event
ws.on('open', () => {
  console.log('Connected to the server!');
  
  // Test joining a room
  const joinMessage = {
    type: 'join',
    payload: {
      roomId: 'test-room',
      username: 'test-user'
    }
  };
  
  console.log('Sending join message:', joinMessage);
  ws.send(JSON.stringify(joinMessage));
  
  // Test sending a chat message after 2 seconds
  setTimeout(() => {
    const chatMessage = {
      type: 'chat',
      payload: {
        message: 'Hello, this is a test message!'
      }
    };
    
    console.log('Sending chat message:', chatMessage);
    ws.send(JSON.stringify(chatMessage));
    
    // Close connection after 2 more seconds
    setTimeout(() => {
      console.log('Test complete. Closing connection.');
      ws.close();
    }, 2000);
  }, 2000);
});

// Listen for messages from the server
ws.on('message', (data) => {
  try {
    const message = JSON.parse(data);
    console.log('Received message:', message);
  } catch (error) {
    console.error('Error parsing message:', error);
    console.log('Raw message:', data.toString());
  }
});

// Handle errors
ws.on('error', (error) => {
  console.error('WebSocket error:', error);
});

// Handle connection close
ws.on('close', (code, reason) => {
  console.log(`Connection closed. Code: ${code}, Reason: ${reason}`);
});
