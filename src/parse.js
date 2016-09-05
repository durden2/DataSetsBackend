require("babel-polyfill");
import fs from 'fs';
var csvparse = require('fast-csv');
import io from 'socket.io-client';

exports = module.exports = (io) => {
  io.sockets.on('connection', (socket) => {
    socket.on('parse', (data) => {
      parsuj(data, io);
    });
  });
}

function parsuj(file, io) {
  var t = new Array();
  csvparse
   .fromPath("./files/" + file, {headers: true, delimiter: ";"})
   .on("data", function(data){
      t.push(data);
   })
   .on("end", function(){
     io.emit('parsed', t);
    });
}
