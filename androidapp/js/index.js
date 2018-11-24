var port = "3000";
var hostname = 'localhost';
var pqdn = 'http://' + hostname + ':' + port;
var streamURI = 'http://192.168.1.4:8080/shot.jpg';
var currCoord = {
	lat : 0,
	lng :0
}
var x = document.getElementById("demo");
console.log(pqdn+'/coordapp')
const coordNps = io(pqdn + '/coordapp');
const imgNps = io(pqdn + '/img');

function getCamera(){
	var video = document.querySelector('.camera-video');
	console.log(video);
	if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
	 navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
	 video.src = window.URL.createObjectURL(stream);
	 video.play();
	 });
	}
}

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
    coordNps.emit('coord', currCoord);
 //    $.ajax({
	// 		url : pqdn + '/currcoord',
	// 		type : "POST",
	// 		data : data,
	// 		success : function(res){
	// 					console.log(res)
	// 				}
	// });
}

function sendPhoto(){
    // $.ajax({
    //     type: "GET",
    //     url: 'https://picsum.photos/200/200/?image=111',
    //     contenType: 'image/jpeg',
    //     success: function(img) {
    //         var sendData = {};
    //         sendData.image = img;
    //         sendData.coord = currCoord;
    //         console.log(sendData.image);
    //         // coordNps.emit('image', sendData);
    //     },
    //     error: function(error, txtStatus) {
    //       console.log(txtStatus);
    //       console.log('error');
    //     }
    //   });
    var myRequest = new XMLHttpRequest();
    console.log("hi")
    // 2. open the request and pass the HTTP method name and the resource as parameters
    myRequest.open('GET', 'https://picsum.photos/200/200/?image=111', true);
    // 3. write a function that runs anytime the state of the AJAX request changes
    myRequest.responseType = 'arraybuffer';
    myRequest.onload = function () 
    { 
        // 4. check if the request has a readyState of 4, which indicates the server has responded (complete)
        if (myRequest.readyState === 4) 
        {
            console.log(myRequest.statusCode)
            var data = "";
            // 5. insert the text sent by the server into the HTML of the 'ajax-content'
            var sendData = {};
            sendData.image = myRequest.response;
            sendData.coord = currCoord;
            console.log(sendData.image);
            coordNps.emit('image', sendData);
            
            
        }
    };
    myRequest.send();
}


console.log(pqdn + '/currcoord');

// setInterval(getLocation, 1000);
// setInterval(sendPhoto, 1000);