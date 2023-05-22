const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 5501 });

wss.on('connection', (ws) => {
  // Handle WebSocket connection
  console.log('WebSocket client connected');

  ws.on('message', (message) => {
    // Handle incoming WebSocket message
    console.log('Received message:', message);
  });

  ws.on('close', () => {
    // Handle WebSocket connection closed
    console.log('WebSocket client disconnected');
  });
});

console.log('WebSocket server started');