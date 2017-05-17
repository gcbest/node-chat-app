var moment = require('moment');

var date = moment(1234);

var D = date.format('MMM Do, YYYY');
var T = date.format('h:mm a')
console.log(T);