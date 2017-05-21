const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const isRealString = require('./utils/validation');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
// need to use the http module with socketIO, can't just use express
var server = http.createServer(app);
// websockets server
var io = socketIO(server);

app.use(express.static(publicPath));

// event listener, socket refers to the individual socket
io.on('connection', (socket) => {
	console.log('New user connected');


	// acknowledgments let the other party know the message has successfully been received
	socket.on('createMessage', (message, callback) => {
		console.log(message);
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback();
	});

	socket.on('join', (params, callback) => {
		if (!isRealString(params.name) || !isRealString(params.room)) {
			callback('Name and room name are required');
		}
		socket.join(params.room);
		// socket.join('Giants Fans');
		// io.to('Giants Fans').emit  sends messages to only people in that room
		// socket.broadcast.to('Giants Fans').emit



		// socket.emit emits an event to a single connection
		// io.emit emits an event to every connection
		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

		// broadcast emits a message to everyone except the person who created the message
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined the room`));

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