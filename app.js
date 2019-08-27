var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("search");    
});

//get the route to the results and add the request
app.get("/results", function (req, res) {
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var parsedData = JSON.parse(body);
            res.render("results", {data: parsedData});
        }    
    });
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server listening on PORT 3000");    
});