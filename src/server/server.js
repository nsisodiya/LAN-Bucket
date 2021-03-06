var appConfig = require("./../config.json");

var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var routes = require("./routes.js")(app);

var server = app.listen(appConfig.applicationPort, function () {
    console.log("Listening on port %s...", server.address().port);
});


require("./../utils/scanNetwork");