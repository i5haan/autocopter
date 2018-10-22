const express = require('express');
const app=express();
const mongoose = require('mongoose')
const Photo = require('./models/Photo')
mongoose.connect('mongodb://localhost/ped', { useNewUrlParser: true })
// var server = require('http').Server(app);
var currCoordinate = {lat : 0, lng : 0};

var SerialPort = require("serialport")
var bodyParser=require("body-parser");
var fs = require('fs');
var clientSocket;

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

app.post('/currcoord', function(req, res) {
	console.log(req.body);
	res.send("hit!!");
});

port="COM3";

var server=app.listen(3000);
var io = require('socket.io')(server);

// const Readline = SerialPort.parsers.Readline;
// const parser = new Readline();

// var serialport = new SerialPort(port,{
// 							baudRate:9600
// 						});
// 
// 
// 
// serialport.pipe(parser);
var coordNamespace = io.of('/coordapp');
coordNamespace.on('connection', function(socket){
	console.log('Phone client was connected made!');
	socket.on('coord', function(data){
		console.log(data);
		if(clientSocket) {
			clientSocket.emit('news', JSON.stringify(data));
		}else{
			console.log('The Client is not connected');
		}
	});
	socket.on('disconnect', function(){
		console.log('Phone Client was disconnected!');
	})
});

var clientNamespace = io.of('/client');
clientNamespace.on('connection', function (socket) {
  	console.log('Client was connected!');
  	clientSocket = socket;
  	socket.on('disconnect', function(){
  		clientSocket = null;
  		console.log('Client Was dissconnected')
  	});
});

// serialport.on("open",function()
// 	{
// 		console.log("Serial port is a open")
// 	});