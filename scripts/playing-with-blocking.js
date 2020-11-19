// This script quickly shows how blocking works with NodeJS
var fs = require('fs');
var path = require('path');

// Blocking
//var data = fs.readFileSync('../resources/input.txt');
// console.log(data.toString());

// Non-blocking
myFilePath = path.join('..', 'resources', 'input.txt');
console.log(myFilePath);
fs.readFile(myFilePath,  'utf-8', function (err, data) {
    if (err)
    {
        console.error(err.stack)
        return;
    }
    console.log(data.toString());
});

console.log('Program Ended');