require("babel-polyfill");
import fs from 'fs';
var csvparse = require('fast-csv');
import io from 'socket.io-client';
var xml2js = require('xml2js');

exports = module.exports = (io) => {
  io.sockets.on('connection', (socket) => {
    socket.on('build', (data) => {
      build(data, io);
    });

    socket.on('buildXML', (data) => {
      buildXML(data, io);
    });
  });
}

function spr(dataZPliku, dataPodane, invar){
  var poleDoSpr = dataPodane.field;
  switch (dataPodane.type) {
    case "equal":
     if(dataZPliku[poleDoSpr] == dataPodane.value){
       return true;
     }else{
       return false
     }
      break;
      case "greater":
      if (dataZPliku[poleDoSpr] > dataPodane.value){
        return true;
     }else{
       return false
     }
      break;
      case "smaller":
      if(dataZPliku[poleDoSpr] < dataPodane.value){
        return true;
      }else{
        return false
      }
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

function sprXML(dataZPliku, dataPodane, invar){
  var poleDoSpr = dataPodane.field;
  var danaDoSpr = dataZPliku[poleDoSpr];
  console.log(danaDoSpr);
  switch (dataPodane.type) {
    case "equal":
     if(danaDoSpr[0] == dataPodane.value){
       return true;
     }else{
       return false
     }
      break;
      case "greater":
      if (danaDoSpr[0] > dataPodane.value){
        return true;
     }else{
       return false
     }
      break;
      case "smaller":
      if(danaDoSpr[0] < dataPodane.value){
        return true;
      }else{
        return false
      }
      break;
      case "invariance":
      if(danaDoSpr[0] == invar){
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
   .fromPath('./files/'+data[0].file, {headers: true})
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

}

function buildXML(dataa, io) {
  var csvStream = csvparse.createWriteStream({headers: true}),
    writableStream = fs.createWriteStream("my.csv");
    csvStream.pipe(writableStream);

  var parser = new xml2js.Parser();
    fs.readFile("./files/" + dataa[0].file, function(err, data) {
        parser.parseString(data, function (err, result) {
          for(var i=0; i < result.response.row[0].row.length; i++)
            for(var j=0; j < dataa.length; j++){
              if(!sprXML(result.response.row[0].row[i], dataa[j])){
                break;
              }else if(j+1 == dataa.length){
                csvStream.write(result.response.row[0].row[i]);
              }
            }
          csvStream.end();
        });
    });
}
