require("babel-polyfill");
import fs from 'fs';
var xml2js = require('xml2js');
import io from 'socket.io-client';

exports = module.exports = (io) => {
  io.sockets.on('connection', (socket) => {
    socket.on('parseXML', (data) => {
      parsujXML(data, io);
    });
  });
}

function parsujXML(file, io) {
  var parser = new xml2js.Parser();
    fs.readFile("./files/" + file, function(err, data) {
        parser.parseString(data, function (err, result) {
          console.log("d");
          io.emit('parsedXML', result);
        });
    });
}
