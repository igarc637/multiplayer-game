const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

let players = [];

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    players.push(socket.id);

    const isDescriber = players.length === 1;
    socket.emit('roleAssignment', { role: isDescriber ? 'describer' : 'guesser' });

    // When someone presses the "stutter" button
    socket.on('buzzStutter', () => {
        console.log(`${socket.id} buzzed for stutter!`);
        io.emit('penalty', { buzzer: socket.id });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        players = players.filter(id => id !== socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
