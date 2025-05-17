console.log("SERVER FILE IS RUNNING");

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('Player connected:', socket.id);

    socket.on('playerMove', (data) => {
        // Send movement to all other players
        socket.broadcast.emit('playerMove', { id: socket.id, ...data });
    });

    socket.on('buttonClicked', () => {
        console.log(`Player clicked the button: ${socket.id}`);
    });

    socket.on('disconnect', () => {
        console.log('Player disconnected:', socket.id);
        socket.broadcast.emit('playerDisconnect', socket.id);
    });
});

// Use dynamic port for Render deployment
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
