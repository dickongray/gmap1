  // google maps api, with changing markers.
    var Op = loadLocationData();
    var markers = [];
  // map details - center zoom etc
   var map = new google.maps.Map(document.getElementById('map'), {
      center: new google.maps.LatLng(-36.8406, 174.7400),
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.TERRAIN
   });
// map asks for clients location on mobile only
if ( $(window).width() <= 768) {
       // scripts
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function (position) {
         initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
         map.setCenter(initialLocation);
     });
 }
}
/*
  Loads the markers by calling the google Maps API and hides the markers,
  to be displayed when the tab is clicked.
*/
function placeMarkers(Op){
   var infowindow = new google.maps.InfoWindow();
   var i, newMarker;
   console.log(Op);
   for (i = 0; i < Op.length; i++) {
     newMarker = new google.maps.Marker({
       position: new google.maps.LatLng(Op[i][1], Op[i][2],Op[i][3]),
       map: map,
       icon: 'items/favicon-32x32.png',
       title: Op[i][0]
     });

     newMarker.category = Op[i][3];
     newMarker.setVisible(false);
     markers.push(newMarker);
     // map infowindow on click
     google.maps.event.addListener(newMarker, 'click', (function(newMarker, i) {
        return function() {
          infowindow.setContent(Op[i][0]);
          infowindow.open(map, newMarker);
        }
      })(newMarker, i));
   }
 }

/*
  Upon a tab click, the map will populate
  the markers of that category. The markers
  have been preloaded and only need to be made visible.
*/
function displayMarkers(category) {
     var i;
     for (i = 0; i < markers.length; i++) {
       if (Number(markers[i].category) === category) {
         markers[i].setVisible(true);
       }
       else {
         markers[i].setVisible(false);
       }
     }
   }
/*
  Function takes the csv containing location data
  and parses it into an array of arrays so that it
  can be used by google maps.
*/
function parseLocationData(opText){
  var Op, opArray;
  opArray = opText.split("\n");
  Op = [];
  for(var i = 0; i < opArray.length; i++){
    // This processing for converting csv to an array of arrays
    // assumes that there are no commas in any of the input strings.
    Op.push(opArray[i].split(','));
  }
  return Op;
}
/*
    This function tells the browser to send a request to the server
    to get locations of stores or whatever.
    Executes asynchronously, meaning that while the file is loading
    the execution will continue and the base map will load.
*/
function loadLocationData(){

  //doesn't work for IE 5 or 6.
  var file_request = new XMLHttpRequest();
  var Op;
  //The var op is just a name means options.
  file_request.onreadystatechange = function() {
    if (file_request.readyState == 4 && file_request.status == 200){
      Op = parseLocationData(file_request.responseText);
      placeMarkers(Op);
    }
  }//change URL depending on server.
  file_request.open("GET","url goes here",true);
  file_request.send();
  return Op;
}
