var express = require('express');
var app=express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var SerialPort = require("serialport")
var bodyParser=require("body-parser");
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.set(bodyParser.urlencoded({extended:true}));

port="COM3"

server.listen(80);

const Readline = SerialPort.parsers.Readline;
const parser = new Readline();

var serialport = new SerialPort(port,{
							baudRate:9600
						});

app.get('/', function (req, res) {
  res.render('map.ejs');
});
app.get('/distance',function(req,res)
{
	res.send("still a work in progress");
})

serialport.pipe(parser);

io.on('connection', function (socket) {
	parser.on("data",function(data)
	{
		socket.emit('news',data);
	});
  	
  	socket.on('message', function (data) {
    console.log(data);
  });
});

serialport.on("open",function()
	{
		console.log("Serial port is a open")
	});