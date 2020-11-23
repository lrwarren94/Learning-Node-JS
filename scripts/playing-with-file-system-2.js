// A continuation of learning Node File System concepts.

var fs = require("fs");
const { tmpdir: tempDirectory } = require("os");
var path = require("path");
var deleteMePath = path.join("..", "resources", "deleteme.txt");
var outputPath = path.join("..", "resources", "output2.txt");
var tempParentDir = path.join("..", "temp");
var tempDir = path.join("..", "temp", "test");
var buf = new Buffer.alloc(1024);

console.log("Going to open an existing file.");
fs.open(outputPath, "r+", function(err, fd){
    if (err)
    {
        return console.error(err);
    }
    console.log("File opened successfully!");
    console.log("Going to truncate the file after 10 bytes.");

    // Truncate the opened file.
    fs.ftruncate(fd, 10, function(err) {
        if (err)
        {
            console.log(err);
        }
        console.log("File truncated successfully.");
        console.log("Going to read the same file..");

        fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
            if (err)
            {
                console.log(err);
            }

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
})

/*
 * Here is an example of deleting a file. Before running,
 * make sure that ../resources/deleteme.txt exists. Create
 * it if it does not.
 */

console.log("Going to delete an existing file.");
fs.unlink(deleteMePath, function(err){
    if (err)
    {
        return console.error(err);
    }
    console.log("File deleted successfully!");
});

// Here is how to create a directory.
console.log("Going to create a directory /temp/test");
fs.mkdir(tempDir, function(err) {
    if (err)
    {
        return console.error(err);
    }

    console.log("Directory created successfully!");
});

console.log("Going to read directory /temp");
fs.readdir(tempParentDir, function(err, files)
{
    if (err)
    {
        return console.error(err);
    }
    files.forEach(function (file) {
        console.log(file);
    });
});

// sleeping for half a second to allow temp/test to be created
setTimeout(function (){
    console.log("Going to delete directory /temp/test");
    fs.rmdir(tempDir, function(err){
        if (err)
        {
            return console.error(err);
        }
        console.log("Going to read directory /temp");

        fs.readdir(tempParentDir, function (err, files) {
            if (err)
            {
                return console.error(err);
            }

            files.forEach(function (file){
                console.log(file);
            })
        });
    });
}, 500);