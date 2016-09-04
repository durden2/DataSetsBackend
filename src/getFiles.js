require("babel-polyfill");
import fs from 'fs';
import io from 'socket.io-client';

export default function getFiles() {
   var files = fs.readdirSync('./files');
   return files;
}
