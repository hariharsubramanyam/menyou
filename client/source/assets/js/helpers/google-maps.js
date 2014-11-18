(function() {

  Menyou.Map = {};

  // Default location is in Boston.
  Menyou.Map.DEFAULT_LOCATION = { lat: 42.3606249, lng: -71.0591156 };

  Menyou.Map.initialize = function() {

    var markers = [];

    var mapOptions = {
            center: Menyou.Map.DEFAULT_LOCATION,
            zoom: 15,
            disableDefaultUI: true
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var user_marker = new google.maps.Marker({
      position: map.center,
      map: map,
      title: 'Me'
    });

    var input = document.getElementById('pac-input');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var searchBox = new google.maps.places.SearchBox((input));

    google.maps.event.addListener(searchBox, 'places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) { return; }
          for (var i = 0, marker; marker = markers[i]; i++) {
                  marker.setMap(null);
          }

      // For each place, get the icon, place name, and location.
      markers = [];
      var bounds = new google.maps.LatLngBounds();
      for (var i = 0, place; place = places[i]; i++) {

          // Create a marker for each place.
          var marker = new google.maps.Marker({
                  map: map,
                  title: place.name,
                  position: place.geometry.location
          });

          markers.push(marker);

          bounds.extend(place.geometry.location);
      }
      map.fitBounds(bounds);
      map.setZoom(15);
    });

    google.maps.event.addListener(map, 'bounds_changed', function() {
          var bounds = map.getBounds();
          searchBox.setBounds(bounds);

          var lat = map.getCenter().lat();
          var lon = map.getCenter().lng();
          Menyou.state.location.lat = lat;
          Menyou.state.location.lon = lon;

          $.ajax({
            url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon + '&sensor=true',
            type: 'GET',
            success: function(object) {
              for (var i=0; i<object.results.length; i++) {
                if (object.results[i].types.indexOf('locality') > -1) {
                  Menyou.state.location.city = object.results[object.results.length-4].formatted_address;
                }
              }
            }
          });

    });

  };

})();

