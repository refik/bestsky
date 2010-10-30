function initialize() { 
  var latlng = new google.maps.LatLng(41, 30);
  var myOptions = {
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map_canvas"),
      myOptions);

  var markerOptions = {
    cursor: 'selam!',
    visible: true,
    map: map,
    position: latlng
  };

  // Try W3C Geolocation (Preferred)
  if(navigator.geolocation) {
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(function(position) {
      initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      map.setCenter(initialLocation);
    }, function() {
      handleNoGeolocation(browserSupportFlag);
    });
  // Try Google Gears Geolocation
  } else if (google.gears) {
    browserSupportFlag = true;
    var geo = google.gears.factory.create('beta.geolocation');
    geo.getCurrentPosition(function(position) {
      initialLocation = new google.maps.LatLng(position.latitude,position.longitude);
      map.setCenter(initialLocation);
    }, function() {
      handleNoGeoLocation(browserSupportFlag);
    });
  // Browser doesn't support Geolocation
  } else {
    browserSupportFlag = false;
    handleNoGeolocation(browserSupportFlag);
  }
  
  function handleNoGeolocation(errorFlag) {
    if (errorFlag == true) {
      initialLocation = latlng;
    } else {
      initialLocation = latlng;
    }
    map.setCenter(initialLocation);
  }

  function print(coor){
    var i = 0;
    for(i=0;i<5;i++){
      alert(coor[i]);
    }
  }

  var oldMarkers = new Array();

  function update(){
      MyOverlay.prototype = new google.maps.OverlayView();
      MyOverlay.prototype.onAdd = function() { }
      MyOverlay.prototype.onRemove = function() { }
      MyOverlay.prototype.draw = function() { }
      function MyOverlay(map) { this.setMap(map); }
      var overlay = new MyOverlay(map);
      var projection = overlay.getProjection();
      var tp = new google.maps.Point(1,1);
      var bp = new google.maps.Point(599,599);
      var post_id = Math.floor(Math.random()*5000)
      var url_get = "get/" + String(post_id) + "/"
      $.ajax({
        url: "map_data/",
        type: "post",
        data: {top : projection.fromContainerPixelToLatLng(tp).toString(), bottom : projection.fromContainerPixelToLatLng(bp).toString(), id : post_id },
        success: function(msg) {
          $.ajax({
            url: url_get,
            cache: false,
            success: function(html){
              var t;
              if(oldMarkers[0]){
                for(t=0;t<5;t++){
                  oldMarkers[t].setMap(null);
                }
              }
              var coordinates = html.split('$');
              var i;
              for(i=0;i<5;i++){
                coordinate = coordinates[i].split(',')
                var latlng = new google.maps.LatLng(Number(coordinate[0]), Number(coordinate[1])); 
                var markerOptions = {
                  visible: true,
                  map: map,
                  position: latlng,
                  icon: '/site_media/img/' + String(i+1) + '.png/'
                };
                marker = new google.maps.Marker(markerOptions);
                //oldMarkers[i].setMap(null);
                oldMarkers[i] = marker;  
              }
            }
          });
        }
      });
  }

  google.maps.event.addListener(map, 'dragend', function() {
    update();
  });

//  google.maps.event.addListener(map, 'zoom_changed', function() {
//    update();        
//  });
}

