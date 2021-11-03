const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
const socket = require('socket.io');
const io = socket(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Something just like this')
})

server.listen(PORT, () => {
    console.log(`Server online on PORT ${PORT}`)
})

io.on('connect', (socket) => {
    socket.emit('me', socket.id);
    socket.on('disconnect', () => {
        socket.broadcast.emit('user disconnected');
    });
    socket.on('calluser', ({ recipient, example }) => {
        io.to(recipient).emit('callmade', { example }); //incorrect parameters
    })
    socket.on('callanswered', ({ to, signal }) => {
        io.to(to).emit("callreceived", signal)
    })
})