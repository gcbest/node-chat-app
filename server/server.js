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

// event handler, socket refers to the individual socket
io.on('connection', (socket) => {
	console.log('New user connected');

	socket.emit('newMessage', {
		from: "joe",
		text: 'hiyo',
		createdAt: 'today'
	});

	socket.on('createMessage', (message) => {
		console.log(message);
	});

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});



server.listen(port, () => {
console.log(`app listening on port ${port}`);
});