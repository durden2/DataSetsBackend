var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
require("babel-polyfill");
import getFiles from './getFiles.js';
var parse = require('./parse.js')(io);

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

io.on('connection', function(socket){
  console.log("user conn");

  socket.emit('getFiles', getFiles());

  socket.on('chat message', function(msg) {
    console.log('message: ' + msg);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(4000, function(){
  console.log('listening on *:4000');
});
