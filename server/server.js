const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
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

	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app')); 

	// broadcast emits a message to everyone except the person who created the message
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));

	// acknowledgments let the other party know the message has successfully been received
	socket.on('createMessage', (message, callback) => {
		console.log(message);
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback();
	});

	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
	});

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});



server.listen(port, () => {
console.log(`app listening on port ${port}`);
});