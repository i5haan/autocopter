var express = require('express');
var app=express();
var mongoose = require('mongoose')
var Photo = require('./models/Photo')
mongoose.connect('mongodb://localhost/ped')
// var server = require('http').Server(app);
var currCoordinate = {lat : 0, lng : 0};

var SerialPort = require("serialport")
var bodyParser=require("body-parser");
var fs = require('fs');

// var fileUpload = require("express-fileupload");
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true, limit: '50mb'}));
// app.use(fileUpload());

app.get('/', function (req, res) {
  res.render('map.ejs');
});
app.get('/distance',function(req,res)
{
	res.send("still a work in progress");
})
app.get('/alerts/checked', function(req, res) {
	Photo.find({checked : "No"}, function(err, photos) {
		if(err){
			console.log(err);
		}
		else{
			console.log(photos);
			res.send(photos);
		}
	})
});

app.get('/mark/:id', function(req, res) {
	console.log(req.params.id);
	Photo.findByIdAndUpdate(req.params.id,{checked : "Yes"}, function(err, photo) {
		if(err){
			console.log(err);
		}
		else{
			console.log(photo);
			res.send({status:"ok"});
		}
	});
});
app.post('/upload', function(req, res) {
	var newRec = {
		file_name : req.body.image,
		checked : "No",
		lat : currCoordinate.lat,
		lng : currCoordinate.lng
	}
	Photo.create(newRec, function(err, photo) {
		if(err){
			console.log(err);
		}
		else{
			console.log(photo);
			res.send('It worked!');
		}
	});
	console.log(req.body)
});

port="COM3";

var server=app.listen(8080);
var io = require('socket.io')(server);

const Readline = SerialPort.parsers.Readline;
const parser = new Readline();

var serialport = new SerialPort(port,{
							baudRate:9600
						});



serialport.pipe(parser);

io.on('connection', function (socket) {
	parser.on("data",function(data)
	{
		currCoordinate = JSON.parse(data);
		console.log(currCoordinate)
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