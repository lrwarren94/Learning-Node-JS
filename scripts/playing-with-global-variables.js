/*
 * In this file, we will be taking a look at global
 * variables and how they can be used in NodeJS.
 */

 // This is how you get the executing file's name.
 console.log("Current file: " + __filename);

 // This is how you get the current directory name.
 console.log("Current directory: " + __dirname);
 
 function printHello() {
     console.log("Hello, world!");
 }

 // Now call printHello after 2 seconds.
 var t = setTimeout(printHello, 2000);

 // Actually, let's clear the timer.
 clearTimeout(t);

 /*
  * Here's how to use setInterval. Use CTRL+C to
  * exit the program.
  */
 setInterval(printHello, 2000);