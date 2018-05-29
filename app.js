var express=require("express");
var app=express();
var serial=require("./serial");
serial.run();


app.listen(8080,function()
	{
		console.log("Server is also start");
	});