/*
 * This script quickly shows how buffers work in NodeJS. Something to note:
 * apparently, some of the Buffer functions and/or constructors have been
 * deprecated since the Tutorialspoint articles were written. For more info,
 * see: https://nodesource.com/blog/understanding-the-buffer-deprecation-in-node-js-10
 */

 // This is how you use buffers. They let you manage byte data in Node.
var buf = new Buffer.alloc(256);
var len = buf.write("Simply Easy Learning");
console.log("Octets written : " + len);
console.log("Buf content : " + buf.toString("utf8"));

// Here's an example of loading an ASCII/UTF8 representation of the alphabet in a buffer.
var buf2 = new Buffer.alloc(26);
for (var i = 0; i < 26; i++) {
    buf2[i] = i + 97;
} 
console.log(buf2.toString("ascii"));
console.log(buf2.toString("ascii", 0, 5));
console.log(buf2.toString("utf8", 0, 5));
console.log(buf2.toString(undefined, 0, 5)); // encoding defaults to "utf8"

// This is how you convert buffer content into JSON.
var buf3 = new Buffer.from("Simply Easy Learning ");
var json = buf3.toJSON(buf3);
console.log(json);

// This is an example of concatenating a list of buffers.
var buf4 = Buffer.concat([buf, buf3]);
console.log("Combined buffer: " + buf4.toString());

var comparisonResult = buf.compare(buf3);

// This is an example of using buffer comparison.
if (comparisonResult < 0) 
{
    console.log(buf + " comes before " + buf3);
}
else if (comparisonResult === 0)
{
    console.log(buf + " is same as " + buf3);
}
else
{
    console.log(buf + " comes after " + buf3);
}

// This is an example of copying buffers.
var buf5 = new Buffer.from("ABC");
//copy a buffer 
var buf6 = new Buffer.alloc(3);
buf5.copy(buf6);
console.log("buf6 content: " + buf6.toString());

// This is an example of how to use the slice method.
var buf7 = buf.slice(0, 6);
console.log("buf7 content: " + buf7.toString());

// This is an example of how to get the length of a buffer.
console.log("buf7 length: " + buf7.length);