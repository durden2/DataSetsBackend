var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
require("babel-polyfill");
import parse from './parse.js';

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(4000, function(){
  parse();
  console.log('listening on *:4000');
});
