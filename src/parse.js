require("babel-polyfill");
import fs from 'fs';
var csvparse = require('csv-parse');
import io from 'socket.io-client';

export default function parse() {
  var socket = io('http://localhost:4000');
  socket.emit('availableFiles', "data");
   var files = fs.readdirSync('../backend/files');
   var f = new Array();
   fs.createReadStream('D:/dupa.csv')
   .pipe(csvparse())
   .on('data', function (data) {
     // Add a connect listener
     console.log(data);



});
}
