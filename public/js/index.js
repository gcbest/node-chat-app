// making a request from the client to the server to open up a websocket and keep that connection open
var socket = io();

socket.on('connect', function () {
	console.log('Connected to server');

	socket.emit('createMessage', {
		from: 'pete',
		text: 'my dragon puffs'
	});

});	

// whenever the connection drops
socket.on('disconnect', function () {
	console.log('Disconnected from server');
});	

socket.on('newEmail', function(email) {
	console.log('New email', email);
});

socket.on('newMessage', function(message) {
	console.log(message);
});