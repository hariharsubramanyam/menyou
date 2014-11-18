(function() {

  Menyou.Map = {};

  var DEFAULT_LOCATION = { lat: 42.3606249, lng: -71.0591156 }; // Boston

  var markers;
  var mapOptions;
  var map;

  var markedRestaurants = []; // string list of restaurant titles, so markers aren't duplicated
  
  /**
   * Mark Resaurants based on the current Recommended Dishes displayed to the User.
   */
  Menyou.Map.mark_restaurants = function() {
    marker = []; markedRestaurants = [];

    dishes = Menyou.state.dishes;

    var infowindow = new google.maps.InfoWindow({});
    var bounds = new google.maps.LatLngBounds();

    for (var i=0; i<dishes.length; i++) {
      var dish = dishes[i]

      if (markedRestaurants.indexOf(dish.restaurant.name) == -1) {

        var latlng = new google.maps.LatLng(dish.restaurant.lat,dish.restaurant.lon)
        bounds.extend(latlng)

        var marker = new google.maps.Marker({
          position: latlng,
          map: map,
          title: dish.restaurant.name
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(this.title);
          infowindow.open(map,this);
        });

        markers.push(marker);
        markedRestaurants.push(dish.restaurant.name);

      }
    }

  }

  /**
   * Initialize Map
   */

  Menyou.Map.initialize = function() {

    markers = [];

    mapOptions = {
            center: DEFAULT_LOCATION,
            zoom: 14,
            disableDefaultUI: true
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    /**
     * Search Box Controller
     */
    var input = document.getElementById('pac-input');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    var searchBox = new google.maps.places.SearchBox((input));
    google.maps.event.addListener(searchBox, 'places_changed', function() {
      var places = searchBox.getPlaces();
      if (places.length == 0) { return; }

      var bounds = new google.maps.LatLngBounds();
      for (var i = 0, place; place = places[i]; i++) {
          bounds.extend(place.geometry.location);
      }
      map.fitBounds(bounds);
      map.setZoom(15);
    });

    /**
     * Biases the search box towards addresses in the map window
     */
    google.maps.event.addListener(map, 'bounds_changed', function() {
          var bounds = map.getBounds();
          searchBox.setBounds(bounds);

          /**
           * Changes the City in the User's state when the bounds of the map change
           *
           * var lat = map.getCenter().lat();
           * var lon = map.getCenter().lng();
           * Menyou.state.location.lat = lat;
           * Menyou.state.location.lon = lon;
           * 
           * $.ajax({
           *   url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon + '&sensor=true',
           *   type: 'GET',
           *   success: function(object) {
           *     for (var i=0; i<object.results.length; i++) {
           *       if (object.results[i].types.indexOf('locality') > -1) {
           *         Menyou.state.location.city = object.results[object.results.length-4].formatted_address;
           *       }
           *     }
           *   }
           * });
           */
    });

  };

})();

