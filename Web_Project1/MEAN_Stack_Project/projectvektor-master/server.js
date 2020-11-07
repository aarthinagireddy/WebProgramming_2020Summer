const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static( __dirname + '/public/dist/public' ));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

const PORT = process.env.PORT || 5000;

// Socket.io
const server = app.listen(PORT, () => {
    console.log(`Standing by on ${PORT}`)
});
const io = require('socket.io')(server);
users = [];
connections = [];


io.sockets.on('connection', (socket) => {
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);

    // Disconnect
    socket.on('disconnect', (data) => {
        users.splice(users.indexOf(socket.username), 1);
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets connected', connections.length)
    });

    // Send traffic
    socket.on('send-traffic', (data) => {
        console.log('Transmission received: ', data);
        io.sockets.emit('traffic', {msg: data, user: socket.username});
    });

    // New User
    socket.on('user', (data) => {
        socket.username = data;
        console.log('Got user: ', data);
        users.push(socket.username);
    });

});
