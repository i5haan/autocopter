var express=require("express");
var app=express();
var io=require("socket.io")
var serial=require("./serial");
serial.run();

app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
// app.set(bodyParser.urlencoded({extended:true}));

app.get("/favicon.ico",function(req, res)
	{
		res.send("No Trouble");
	});

app.get("/status",function(req, res)
	{
		serial.send("S");
		res.send(JSON.stringify({status:"OK"}));
	});

app.get("/:val",function(req, res)
	{
		var v=req.params.val;
		// console.log(v);
		serial.send(v);
		res.send(JSON.stringify({status:"OK",val:v}));
	});

app.get("/",function(req,res)
	{
		res.render("index");
	});

var server=app.listen(8080,function()
	{
		console.log("Server is also start");
	});
var socketServer=io(server);
// socketServer.on("connection",function(socket)
// 	{
// 		console.log("Client Connected!");
// 		serial.port.on()
// 	});
