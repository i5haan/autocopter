var SerialPort = require("serialport")
// SerialPort.list(function (err, ports) {
//   ports.forEach(function(port) {
//     console.log(port.comName);
//   });
// });

function send(val)
{
	var val=Math.floor(Math.random()*255);
	console.log(val)
	serialport.write(Buffer(String(val)));
}
function run()
{
	port="COM3"
	var serialport = new SerialPort(port,
						{
							baudRate:9600
						});
	serialport.on('open', function(){
	  console.log('Serial Port Opend');
	  serialport.on('data', function(data){
	    console.log(data.toString().trim());
	  });
	});
}
module.exports={
	send:send,
	run:run
}











