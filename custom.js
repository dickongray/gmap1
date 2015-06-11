 // google maps api, with changing markers.

 var Op = [
     ['new address', -36.828512000000000000, 174.654241100000040000, 1],
     ['No idea <img src="#" alt="img goes here" >', -36.8630231,174.8654693, 1],
     ['Op', -36.9876769,174.4729328, 2],
     ['Op', -36.9528412,174.6329212, 3],
     ['Op', -36.9528412,174.4729328, 3],
     ['Op', -36.8428412,174.6329212, 3],
     ['Op', -36.9572412,174.6329212, 2],
     ['Op', -36.9578412,174.6329212, 2],
     ['Op', -36.6758412,174.7629212, 1],
     ['Op', -36.5674412,174.4729328, 1],
     ['Op', -36.8528412,175.9572912, 1],
     ['Op', -36.9348412,174.63235462, 2]
   ];
// map details - center zoom etc
   var map = new google.maps.Map(document.getElementById('map'), {
      center: new google.maps.LatLng(-36.8406, 174.7400),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
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
// map markers & info window
var infowindow = new google.maps.InfoWindow();

   var markers = [];
   var i, newMarker;

   for (i = 0; i < Op.length; i++) {
     newMarker = new google.maps.Marker({
       position: new google.maps.LatLng(Op[i][1], Op[i][2],Op[i][3]),
       map: map,
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
function displayMarkers(category) {
     var i;

     for (i = 0; i < markers.length; i++) {
       if (markers[i].category === category) {
         markers[i].setVisible(true);
       }
       else {
         markers[i].setVisible(false);
       }
     }
   }