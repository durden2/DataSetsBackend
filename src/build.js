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
  var data = data[0];
  var invar;
  var i = 0;
  var toSave = [];
  var csvStream = csvparse.createWriteStream({headers: true}),
    writableStream = fs.createWriteStream("my.csv");
csvStream.pipe(writableStream);
  csvparse
   .fromPath('./files/'+data.file, {headers: true}, {delimiter: ','})
   .validate(function(data2){
     var d = data.field;
     if (i == 0) {
      invar = data2[d];
      i++;
    }
     switch (data.type) {
       case "equal":
        return data2[d] = data.value;
         break;
         case "greater":
         if (data2[d] > data.value){
           console.log(data2[d], data.value);
           csvStream.write(data2);
          return data2[d] > data.value;
        }
         break;
         case "smaller":
         return data2[d] < data.value;
         break;
         case "invariance":
         if(data2[d] == invar){
          return true;
        }else {
          return false;
        }
         break;

       default:

     }
   })
   .on("finish", function(){
     csvStream.end();
   });

  /*data.file;
  data.field;
  data.value;
  data.type;*/
}
