var SerialPort = require("serialport")
// SerialPort.list(function (err, ports) {
//   ports.forEach(function(port) {
//     console.log(port.comName);
//   });
// });

port="COM3"

const Readline = SerialPort.parsers.Readline;
const parser = new Readline();


var serialport = new SerialPort(port,{
							baudRate:9600
						});

function send(val)
{
	serialport.write(Buffer(String(val)));
}


function run()
{
	serialport.pipe(parser);
	parser.on('data', console.log);
	// serialport.on('open', function(){
	// 	console.log('Serial Port Opend');
	// 	serialport.on('data', function(data){
	// 		console.log(data);
	// 	});
	// });
}


module.exports={
	send:send,
	run:run,
	port:serialport
}
