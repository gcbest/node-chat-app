const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const isRealString = require('./utils/validation');
const Users = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
// need to use the http module with socketIO, can't just use express
var server = http.createServer(app);
// websockets server
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

// event listener, socket refers to the individual socket
io.on('connection', (socket) => {
	console.log('New user connected');


	// acknowledgments let the other party know the message has successfully been received
	socket.on('createMessage', (message, callback) => {
		var user = users.getUser(socket.id);

		if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
		callback();
	});

	socket.on('join', (params, callback) => {
		if (!isRealString(params.name) || !isRealString(params.room)) {
			return callback('Name and room name are required');
		}

		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);

		io.to(params.room).emit('updateUserList', users.getUserList(params.room));
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
		var user = users.getUser(socket.id);

		if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
	});

	socket.on('disconnect', () => {
		console.log('User disconnected');
		var user = users.removeUser(socket.id);

		if (user) {
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left` ));
		}
	});
});



server.listen(port, () => {
console.log(`app listening on port ${port}`);
});