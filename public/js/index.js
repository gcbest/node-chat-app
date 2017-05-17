// making a request from the client to the server to open up a websocket and keep that connection open
var socket = io();

socket.on('connect', function () {
	console.log('Connected to server');
});	

// whenever the connection drops
socket.on('disconnect', function () {
	console.log('Disconnected from server');
});	

socket.on('newMessage', function(message) {
	console.log(message);
});