var fs = require("fs");
var path = require("path");
var zlib = require("zlib");
var myInputPath = path.join("..", "resources", "input.txt");
var myInputPath2 = path.join("..", "resources", "input2.txt");
var myOutputPath = path.join("..", "resources", "output.txt");

// Create a readable stream
var readerStream = fs.createReadStream(myInputPath);

// Create a writable stream
var writerStream = fs.createWriteStream(myOutputPath);

// Pipe the read and write operations
// read input.txt and write data to output.txt
readerStream.pipe(writerStream);

// Compress the file input.txt to input.txt.gz
fs.createReadStream(myInputPath)
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(myInputPath + ".gz"));
console.log("File compressed.");

/*
 * Not playing with promises or anything fancy, so setting
 * a classic timeout to wait for the compression to be done.
 * Then, we can begin decompressing.
 */
setTimeout(function(){
    // Decompress the file input.txt.gz to input2.txt
    fs.createReadStream(myInputPath + ".gz")
        .pipe(zlib.createGunzip())
        .pipe(fs.createWriteStream(myInputPath2));
}, 500);
console.log("File decompressed.");

console.log("Program Ended");