/*
 * In this script, we will be experimenting with various
 * methods of the Node File System module.
 */

var fs = require("fs");
var path = require("path");
var inputPath = path.join("..", "resources", "input2.txt");
var outputPath = path.join("..", "resources", "output2.txt");

// Asynchronous read
fs.readFile(inputPath, function (err, data) {
    if (err) 
    {
        return console.error(err);
    }

    console.log("Asynchronous read 1: " + data.toString());
});

// Synchronous read
var data = fs.readFileSync(inputPath);
console.log("Synchronous read: " + data.toString());

console.log("Ended read portion of the program.");

// Asynchronous - Opening File
console.log("Going to open file!");
fs.open(inputPath, "r+", function (err, fd){{
    if (err)
    {
        return console.error(err);
    }
    
    console.log("File opened successfully!");
}});

// Here we are going to get the stats of a file.
console.log("Getting file info...");
fs.stat(inputPath, function (err, stats) {
    if (err)
    {
        return console.error(err);
    }
    console.log(stats);
    console.log("Got file info sucessfully!");

    // Check file type
    console.log("isFile ? " + stats.isFile());
    console.log("isDirectory ? " + stats.isDirectory());
});

// Here we are going to write to a file.
console.log("Going to write into existing file");
fs.writeFile(outputPath, "Programming is a fun hobby!", function (err){
    if (err) 
    {
        return console.error(err);
    }

    console.log("Data written successfully!");
    console.log("Let's read newly written data.");

    fs.readFile(outputPath, function (err, data) {
        if (err)
        {
            return console.error(err);
        }

        console.log("Asynchronous read 2: " + data.toString());
    });
});

/* Here is another method you can use to read from a file. Also, here
 * is how to close a file.
 */
var buf = new Buffer.alloc(1024);

console.log("Going to open an existing file.");
fs.open(inputPath, "r+", function (err, fd){
    if (err)
    {
        return console.error(err);
    }
    console.log("File opened successfully!");
    console.log("Going to read the file.");

    fs.read(fd, buf, 0, buf.length, 0, function (err, bytes){
        if (err)
        {
            console.log(err);
        }
        console.log(bytes + " bytes read");

        // Print only read bytes to avoid junk.
        if (bytes > 0)
        {
            console.log(buf.slice(0, bytes).toString());
        }

        // Close the opened file.
        fs.close(fd, function(err){
            if (err)
            {
                console.log(err);
            }
            console.log("File closed successfully.");
        });
    });
});