// REQUIRE---------------------------------------------------
var express = require("express");
var path = require("path");
var app = express();
var count = 0;

// USE-------------------------------------------------------
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

// ROUTES----------------------------------------------------
app.get('/', function(req,res){
	res.render("index");
	})

// app.post('/', function(req,res){
// 	// reset = {
// 	// 	count: 0
// 	// };
// 	res.redirect("/");
// });

// SERVER----------------------------------------------------
var server = app.listen(8888, function(){
	console.log("buttonGame is listening on port 8888");
});


// SOCKETS---------------------------------------------------
var io = require("socket.io").listen(server);

io.sockets.on("connection", function (socket){
	socket.on("button_clicked", function(data){
		// container = {count: count++};
		count++;
		console.log(count)
        io.emit("button_response", {response: count});
	});

	socket.on("reset_clicked", function(data){
		// container = {count: 0}
		count = 0;
		console.log(count)
        io.emit('reset_response', {response: count});
    });
})