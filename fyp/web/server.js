var http = require('http');
var app = require('./app');

http.createServer(app.handleReq).listen(3000); //handling app.js requests