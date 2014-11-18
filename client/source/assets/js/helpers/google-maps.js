(function() {

  Menyou.Map = {};

  Menyou.Map.initialize = function() {

    var markers = [];

    var mapOptions = {
            center: { lat: 42.3606249, lng: -71.0591156},
            zoom: 15,
            disableDefaultUI: true
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

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
    });

  };

})();

