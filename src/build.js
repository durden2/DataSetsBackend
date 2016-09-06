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

function spr(dataZPliku, dataPodane, invar){
  var poleDoSpr = dataPodane.field;
  switch (dataPodane.type) {
    case "equal":
     if(dataZPliku[poleDoSpr] == dataPodane.value){
       console.log(dataZPliku[poleDoSpr], dataPodane.value);
       return true;
     }
      break;
      case "greater":
      if (dataZPliku[poleDoSpr] > dataPodane.value){
        return true;
     }
      break;
      case "smaller":
      if(dataZPliku[poleDoSpr] < dataPodane.value){
        return true;
      };
      break;
      case "invariance":
      if(dataZPliku[poleDoSpr] == invar){
       return true;
       }else {
         return false;
       }
      break;

    default:
      return false;
  }
}

function build(data, io) {
  var invar;
  var i = 0;
  var toSave = [];
  var csvStream = csvparse.createWriteStream({headers: true}),
    writableStream = fs.createWriteStream("my.csv");
    csvStream.pipe(writableStream);
  csvparse
   .fromPath('./files/'+data[0].file, {headers: true}, {delimiter: ','})
   .validate(function(fieldWPliku){
    for(var j=0; j < data.length; j++){
      if(!spr(fieldWPliku, data[j])){
        break;
      }else if(j+1 == data.length){
        csvStream.write(fieldWPliku);
      }
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
