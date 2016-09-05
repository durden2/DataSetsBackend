require("babel-polyfill");
import fs from 'fs';
var csvparse = require('fast-csv');
import io from 'socket.io-client';

exports = module.exports = (io) => {
  io.sockets.on('connection', (socket) => {
    socket.on('build', (data) => {
      build(data, io);
    });
  });
}

function build(data, io) {
  console.log(data);
}
