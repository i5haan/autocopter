var port = "3000";
var hostname = '192.168.43.170';
var pqdn = 'http://' + hostname + ':' + port;
var currCoord = {
	lat : 0,
	lng :0
}
var x = document.getElementById("demo");
console.log(pqdn+'/coordapp')
const socket = io(pqdn + '/coordapp');

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
	// Showing On Front End
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude; 

    // Saving Coordinates in Object
    currCoord = {
    	lat : Number(position.coords.latitude),
    	lng : Number(position.coords.longitude)
    }

    // Serializing data into form data
    var data = $.param(currCoord,true)
    console.log(data)

    // Sending Coordinates to Server
    socket.emit('coord', currCoord);
 //    $.ajax({
	// 		url : pqdn + '/currcoord',
	// 		type : "POST",
	// 		data : data,
	// 		success : function(res){
	// 					console.log(res)
	// 				}
	// });
}


console.log(pqdn + '/currcoord');

setInterval(getLocation, 1000);