/**
 * Event handlers for the map.
 *
 * Author: daniman
 */

(function() {

  Menyou.Map = {};

  /*var DEFAULT_LOCATION = { lat: 42.359132, lng: -71.093659}; // MIT*/
  var DEFAULT_LOCATION = { lat: 42.358638, lng: -71.093345}; // MIT
  var USER_POSITION = "http://maps.google.com/mapfiles/kml/pal2/icon10.png";
  var RESTAURANT_POSITION = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=|5D8A31";
  var LOCATE_ME_BUTTTON = "http://cdn.androidpolice.com/wp-content/uploads/2012/09/nexusae0_btn_myl_normal.png";
  
  var markers;
  var mapOptions;
  var map;

  // String list of Restaurant titles - so Restaurants aren't marked twice.
  var markedRestaurants = [];
  
  /**
   * Mark Resaurants based on the current Recommended Dishes displayed to the User.
   */
  Menyou.Map.mark_restaurants = function() {
    markers = []; markedRestaurants = [];
    var bounds = new google.maps.LatLngBounds();

    dishes = Menyou.state.dishes;
    for (var i=0; i<dishes.length; i++) {
      var dish = dishes[i]

      if (markedRestaurants.indexOf(dish.restaurant.name) == -1) {

        var latlng = new google.maps.LatLng(dish.restaurant.lat,dish.restaurant.lon)
        bounds.extend(latlng)

        var infowindow = new google.maps.InfoWindow({});

        var marker = new google.maps.Marker({
          icon: RESTAURANT_POSITION,
          position: latlng,
          map: map,
          title: dish.restaurant.name,
          address: dish.restaurant.address,
          dishes: [dish.name]
        });

        google.maps.event.addListener(marker, 'click', function() {
          $('.meal').each(function(index) { $(this).removeClass('selected'); })

          var looking_for = this.title;

          $('.meal').each(function(index) {
            var restaurant = $(this).find('.restaurant').html();
            if (looking_for == restaurant) {
              $(this).addClass('selected');
            }
          })

          var info_html = Menyou.templates["infowindow"]({
            "title": this.title,
            "address": this.address,
            "dishes": this.dishes
          });
          infowindow.setContent(info_html);
          infowindow.open(map,this);
        });

        markers.push(marker);
        markedRestaurants.push(dish.restaurant.name);

      } else {
        var marker = markers[markedRestaurants.indexOf(dish.restaurant.name)]
        marker.dishes.push(dish.name)
      }

    }

    $(document).on("click", ".meal", function() {
      var restaurant = $(this).find('.restaurant').html();
      var index = markedRestaurants.indexOf(restaurant);
      google.maps.event.trigger(markers[index], 'click');
    });

  }

  /**
   * Initialize Map
   */

  Menyou.Map.initialize = function() {

    markers = [];

    var current_position = {
      lat: Menyou.state.location.lat,
      lng: Menyou.state.location.lon
    }

    mapOptions = {
            center: current_position,
            zoom: 14,
            disableDefaultUI: true
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    /**
     * Mark User's Location
     */
    var user_marker = new google.maps.Marker({
        icon: USER_POSITION,
        position: map.center,
        map: map,
        title: 'You are here.'
    });

    google.maps.event.addListener(user_marker, 'click', function() {
      infowindow.setContent(this.title);
      infowindow.open(map,this);
    });

    /*
    Put the "Locate Me" button on the map
    */
    var locate_me_btn = $("<img>").attr("src", LOCATE_ME_BUTTTON)
                        .height(50).width(50);
    //set postion of the btn
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(locate_me_btn[0]);
    google.maps.event.addDomListener(locate_me_btn[0], 'click', function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(location){
          var lat = location.coords.latitude,
              lon = location.coords.longitude;
          //change the center of the map
          map.setCenter({lat: lat, lng: lon});
          //modify UI and state
          handleMapChange(lat, lon);
        });
      } else {
        alert("Your browser doesn't support Geolocation");
      }

    });

    /**
     * Search Box Controller
     */
    var input = document.getElementById('pac-input');
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
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

      var lat = map.getCenter().lat();
      var lon = map.getCenter().lng();
      //modify UI and state
      handleMapChange(lat, lon);   
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

    /**
    Changes the position of the user marker, changes Menyou state, and displays
    the "Recommend Nearby" button
    @param lat_lng - this is a structure with coordinates of the map's center
    The format is:
    {lat: Number, lng: Number}
    **/
    function handleMapChange(lat, lon){
      //change the position of the user marker
      user_marker.setPosition({lat: lat, lng: lon});
      //change state
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
      //TODO Need to use a callback?
      $("#recommend-btn").show();  
    }

  };

})();

