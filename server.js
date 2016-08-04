var express = require("express");
var app = express();

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

var server = app.listen(8080, function() {
	var address = server.address();
	console.log("app is listening on %s", address.port);
});
