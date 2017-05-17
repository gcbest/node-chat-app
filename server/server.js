const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000
var app = express();
// need to use the http module with socketIO, can't just use express
var server = http.createServer(app);
// websockets server
var io = socketIO(server);

app.use(express.static(publicPath));

// event listener, socket refers to the individual socket
io.on('connection', (socket) => {
	console.log('New user connected');

	// socket.emit emits an event to a single connection
	// io.emit emits an event to every connection

	socket.emit('newMessage', {
		from: 'Admin',
		text: 'Welcome to the chat app',
		createdAt: new Date().getTime()
	});

	socket.broadcast.emit('newMessage', {
		from: 'Admin',
		text: 'New User Joined',
		createdAt: new Date().getTime()
	})

	socket.on('createMessage', (message) => {
		console.log(message);
		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		});

		// broadcast emits a message to everyone except the person who created the message
		socket.broadcast.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		});
	});

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});



server.listen(port, () => {
console.log(`app listening on port ${port}`);
});