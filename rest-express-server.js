/*
 * In this script, we will be taking a look at developing REST services with
 * express and NodeJS.
 */

var express = require("express");
var app = express();
var fs = require("fs");
var path = require("path");
var usersPath = path.join(__dirname, "resources", "users.json")
var id = 2;

var user = {
    "user4": {
        "name": "mohit",
        "password": "password4",
        "profession": "teacher",
        "id": 4
    }
}

app.get("/listUsers", function (req, res){
    fs.readFile(usersPath, "utf8", function (err, data){
        console.log(data);
        res.end(data);
    });
});

app.get("/:id", function (req, res){
    // First read existing users.
    fs.readFile(usersPath, "utf8", function(err, data){
        var users = JSON.parse(data);
        var user = users["user" + req.params.id];
        console.log(user);
        res.end(JSON.stringify(user));
    });
});

app.post("/addUser", function (req, res){
    // First read existing users.
    fs.readFile(usersPath, "utf8", function (err, data){
       data = JSON.parse(data);
       data["user4"] = user["user4"];
       console.log(data);
       res.end(JSON.stringify(data)); 
    });
});

app.delete("/deleteUser", function (req, res){
    // First read existing users
    fs.readFile(usersPath, "utf8", function (err, data){
        data = JSON.parse(data);
        delete data["user" + id];

        console.log(data);
        res.end(JSON.stringify(data));
    });
});

var server = app.listen(8081, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});