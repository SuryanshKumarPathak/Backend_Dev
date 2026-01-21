const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 3000;
 
const inputFile  = path.join(__dirname,"input.txt");
const outputFile = path.join(__dirname, "output.txt");

let content = "";
let wordCount = 0;

fs.readFile(inputFile, "utf-8",(err, data) => {
  if (err) throw err;
  content = data;
  wordCount += content.trim().split(/\s+/).length;
  writeFile();
  
});



function writeFile(){
fs.writeFile(outputFile, `Word Count: ${wordCount}`, (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
    console.log("Word count written to output.txt successfully!");
});
}