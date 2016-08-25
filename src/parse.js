require("babel-polyfill");
import fs from 'fs';

export default function parse() {
   var files = fs.readdirSync('../backend/files');
   return files;
}
