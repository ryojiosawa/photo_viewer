var express = require("express");
var app = express();

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

var port = process.env.PORT || 5000;

var server = app.listen(port, function() {
	var address = server.address();
	console.log("app is listening on %s", address.port);
});
