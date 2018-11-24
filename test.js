var request = require('request').defaults({ encoding: null });
var fs = require('fs');

// request.get('http://192.168.43.117:8080/shot.jpg', function(e,r,b) {
// 	var a = new Buffer(b,'utf8')
// 	console.log(b);
// 	require('fs').writeFile('/image/2.jpg', b, console.log)
// });

// require('fs').readFile('/2.jpg', function(err, data){
// 	console.log(err, data);
// })

fs.readFile('C:/image/1002185.jpg', function (err, buf) {
	var a = Buffer.from(buf.toString(), 'base64');
	console.log(a);
	fs.writeFile('/image/56.jpg', a, console.log);
})