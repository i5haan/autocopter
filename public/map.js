var file_path = '/images/';
function markSafe(url) {
  console.log("hi")
    // 1. create a new XMLHttpRequest object -- an object like any other!
    var myRequest = new XMLHttpRequest();
    console.log("hi")
    // 2. open the request and pass the HTTP method name and the resource as parameters
    myRequest.open('GET', url);
    // 3. write a function that runs anytime the state of the AJAX request changes
    myRequest.onreadystatechange = function () 
    { 
        // 4. check if the request has a readyState of 4, which indicates the server has responded (complete)
        if (myRequest.readyState === 4) 
        {
            console.log(myRequest.statusCode)
            var data = "";
            // 5. insert the text sent by the server into the HTML of the 'ajax-content'
            console.log(myRequest.responseText)
            
            
        }
    };
    myRequest.send();
}
function allAlerts()
  {
    console.log("hi")
    // 1. create a new XMLHttpRequest object -- an object like any other!
    var myRequest = new XMLHttpRequest();
    console.log("hi")
    // 2. open the request and pass the HTTP method name and the resource as parameters
    myRequest.open('GET', '/alerts/checked');
    // 3. write a function that runs anytime the state of the AJAX request changes
    myRequest.onreadystatechange = function () 
    { 
        // 4. check if the request has a readyState of 4, which indicates the server has responded (complete)
        if (myRequest.readyState === 4) 
        {
            var data = "";
            // 5. insert the text sent by the server into the HTML of the 'ajax-content'
            var d = JSON.parse(myRequest.responseText);
            console.log(d);
            d.forEach(function (alert) {
              var s = '<div class="col-md-3 col-sm-6" >' +
              '<div class="thumbnail">' +
                 '<img src="' + file_path + alert.file_name+'.jpg">' +
                 '<div class="caption">' +
                    'Latitude : ' + alert.lat + ' Longitude : ' + alert.lng +
                 '</div>' +
                 '<p>' +
                 '<h4>' + alert.created + '</h4>' +
                 '</p>' +
                 '<p>' +
                    '<button class="btn btn-primary mark" href="/mark/' + alert._id +'">Mark As Safe</button>' +
                 '</p>' +
              '</div>' +
              '</div>';
              data = data + s;
              console.log(s)
            });
            var div = document.querySelector('.alerts');
            div.innerHTML = data;
            // console.log(data)
            var b = document.querySelector("button.mark");


            b.addEventListener("click", function() {
              markSafe(this.getAttribute('href'));
              allAlerts();
            });
            
        }
    };
    myRequest.send();
  };

function makeRequest(p1,p2)
  {
    console.log("hi")
    // 1. create a new XMLHttpRequest object -- an object like any other!
    var myRequest = new XMLHttpRequest();
    // console.log('https://maps.googleapis.com/maps/api/directions/json?origin=30.352642,76.370483&destination=30.352642,76.270483&key=AIzaSyDZikYlRBV20CA1XwXS_OVKUQPQnOc7siI'+id)
    // 2. open the request and pass the HTTP method name and the resource as parameters
    myRequest.open('GET', 'https://maps.googleapis.com/maps/api/directions/json?origin='+p1.lat+','+p1.lng+'&destination='+p2.lat+','+p2.lng+'&key=AIzaSyDZikYlRBV20CA1XwXS_OVKUQPQnOc7siI');
    // 3. write a function that runs anytime the state of the AJAX request changes
    myRequest.onreadystatechange = function () 
    { 
        // 4. check if the request has a readyState of 4, which indicates the server has responded (complete)
        if (myRequest.readyState === 4) 
        {
            // 5. insert the text sent by the server into the HTML of the 'ajax-content'
            var d = JSON.parse(myRequest.responseText);
            console.log(d);
        }
    };
    myRequest.send();
  };

function initMap() {
        var myLatLng = {lat: 30.3566420, lng: 76.3704814};
        var dest = {lat: 30.3532994, lng: 76.3619734};
        var s=[
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ];

        var map = new google.maps.Map(document.getElementById('map'), {
          center: myLatLng,
          zoom: 18,
          styles: s
        });
        var directionsDisplay;
        var directionsService
        document.querySelector("button.compute").addEventListener("click",function()
        {
            if(directionsDisplay)
            {
                directionsDisplay.setMap(null);
            }
            directionsDisplay = new google.maps.DirectionsRenderer({
            map: map
            });
            dest={lat: parseFloat(document.querySelector("input.lat").value), lng: parseFloat(document.querySelector("input.lon").value)};
            var o=myLatLng;
            makeRequest(myLatLng,dest)
            var request = {
              destination: dest,
              origin: new google.maps.LatLng(myLatLng.lat,myLatLng.lng),
              travelMode: 'TRANSIT'
            };
            
            // Pass the directions request to the directions service.
            directionsService = new google.maps.DirectionsService();
            directionsService.route(request, function(response, status) {
              if (status == 'OK') {
                // Display the route on the map.
                directionsDisplay.setDirections(response);
              }
            });
        });
		var marker = new google.maps.Marker({
			position: myLatLng,
		    map: map,
		    title: 'Hello World!'
		});
    var marker2 = new google.maps.Marker({
            position: myLatLng, 
            map: map
        });
    google.maps.event.addListener(map, 'click', function(event) {
       placeMarker(event.latLng);
    });

    function placeMarker(location) {
        marker2.setPosition(location);
        document.querySelector("input.lat").value=location.lat();
        document.querySelector("input.lon").value=location.lng();
    }
    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
    var socket = io.connect('http://localhost:3000/client');
          socket.on('news', function (data) {
            console.log(data);
            myLatLng=JSON.parse(data);
            var latlng = new google.maps.LatLng(myLatLng.lat,myLatLng.lng);
            marker.setPosition(myLatLng);
            map.setCenter(myLatLng)
            console.log(myLatLng)
            socket.emit('my other event', { my: 'data' });
      });
}


var b1=document.querySelector("button#loc");
var b2=document.querySelector("button#sur");
var b3 = document.querySelector('button#alert');

b1.addEventListener("click",function()
  {
      document.querySelector("div.location").classList.remove("hide");
      document.querySelector("div.Photo").classList.add("hide");
      document.querySelector("div.Alert").classList.add('hide');
  });

b2.addEventListener("click",function()
  {
      document.querySelector("div.location").classList.add("hide");
      document.querySelector("div.Photo").classList.remove("hide");
      document.querySelector('div.Alert').classList.add('hide')
  });

b3.addEventListener("click",function()
  {
      document.querySelector("div.location").classList.add("hide");
      document.querySelector("div.Photo").classList.add("hide");
      document.querySelector('div.Alert').classList.remove('hide')
      allAlerts();
  });


      