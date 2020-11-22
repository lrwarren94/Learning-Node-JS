var fs = require("fs");
var path = require("path");
var myFilePath = path.join("..", "resources", "grammar.txt");
var myOutPutPath = path.join("..", "resources", "output.txt");
var data = "";

// Create a readable stream
var readerStream = fs.createReadStream(myFilePath);

// Set the encoding to be utf8.
readerStream.setEncoding("utf8");

// Handle stream events --> data, end, and error
readerStream.on("data", function(chunk){
    data += chunk;
});

readerStream.on("end", function(){
    console.log(data);
});

readerStream.on("error", function(err){
    console.log(err.stack);
});

console.log("Reading Ended");

// Create a writable stream
var writerStream = fs.createWriteStream(myOutPutPath);

// Write the data to stream wtih encoding to be utf8
var sampleText = "Here is some data that I want to write to a file.";
writerStream.write(sampleText, "UTF8");

// Mark the end of file
writerStream.end();

// Handle stream events --> finish, and error
writerStream.on("finish", function(){
    console.log("Write completed");
});

writerStream.on("error", function(err){
    console.log(err.stack);
});

console.log("Writing Ended");