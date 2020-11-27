/*
 * Here, we will be learning about using Express in a server.
 */

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var multer = require("multer");
var fs = require("fs");
var cookieParser = require("cookie-parser");
var app = express();

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(urlencodedParser);
var upload = multer({dest: "/temp/"});
app.use(cookieParser());

/*
 * This is how you reference a directory to keep static assets.
 * Express serves these assets without you having to route them.
 */ 
app.use(express.static("public"));

// This responds with "Hello GET" on the homepage
app.get("/", function (req, res) {
    console.log("Got a GET request for the homepage")
    res.send("Hello GET");
    console.log("Cookies: ", req.cookies);
});

// This responds a POST request for the homepage
app.post("/", function (req, res) {
    console.log("Got a POST request for the homepage");
    res.send("Hello POST");
});

app.get("/index.htm", function (req, res) {
    res.sendFile(path.join(__dirname, "html", "index.htm"));
});

app.get("/process_get", function (req, res) {
    // Prepare output in JSON format
    response = {
        first_name: req.query.first_name,
        last_name: req.query.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
});

app.post("/process_post", urlencodedParser, function (req, res){
    // Prepare output in JSON format
    response = {
        first_name: req.body.first_name,
        last_name: req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
});

/*
 * Warning: this post method is just an example of how to upload
 * files to a site. This is probably not secure at all, so be sure
 * to research best practices. This also would not work in production.
 */
app.post("/file_upload", upload.single("file"), function (req, res) {
    console.log(JSON.stringify(req.file));
    console.log(req.file.filename);
    console.log(req.file.path);
    console.log(req.file.mimetype);
    var filePath = path.join(__dirname, "resources", req.file.filename);

    fs.readFile(req.file.path, function (err, data){
        fs.writeFile(filePath, data, function (err) {
            if (err)
            {
                console.log(err);
            }
            else
            {
                response = {
                    message: "File uploaded successfully",
                    filename: req.file.filename
                };
            }

            console.log(response);
            res.send(JSON.stringify(response));
        });
    });
});

// This responds a DELETE request for the /del_user page.
app.delete("/del_user", function (req, res) {
    console.log("Got a DELETE request for /del_user");
    res.send("Hello DELETE");
});

// This responds a GET request for the /list_user page.
app.get("/list_user", function (req, res) {
    console.log("Got a GET request for /list_user");
    res.send("Page Listing");
});

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get("/ab*cd", function (req, res) {
    console.log("Got a GET request for /ab*cd");
    res.send("Page Pattern Match");
});

var server = app.listen(8081, function (){
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});