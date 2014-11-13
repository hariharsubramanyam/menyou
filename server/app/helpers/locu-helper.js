var request = require("request");
/**
 * Given a properly formatted menu object returned from the Locu API
 * (see https://dev.locu.com/documentation/#menu), extract the menu items.
 *
 * @param menu - A menu object returned from the Locu API.
 * @param restaurant - An object which will be added as the "restaurant" field of each menu item. 
 * @returns An array of menu items, formatted as:
 * [
 *  {
 *    "name": String (the name of the dish),
 *    "description": String (the description of the dish),
 *    "price": Number (the price of the dish in USD),
 *    "restaurant": Object (the restaurant object you provide)
 *  },
 *  ...
 * ]
 */
var extract_menu_items = function(menu, restaurant) {
  var menu_items = [];

  // Iterate through the sections.
  menu.sections.forEach(function(section) {
    
    // Iterate through the subsections.
    section.subsections.forEach(function(subsection) {

      // Iterate through the subsection contents.
      subsection.contents.forEach(function(subsection_content) {

        // If this is is a menu item, add it to the array.
        if (subsection_content.type === "ITEM") {
          var item = subsection_content;
          menu_items.push({
            "name": (item.name) ? item.name : null,
            "description": (item.description) ? item.description : null,
            "price": (item.price) ? item.price : null,
            "restaurant": (restaurant) ? restaurant : null
          });
        }

      }); // subsection contents.
    }); // subsections.
  }); // sections.

  return menu_items;
};

/**
 * Given a properly formatted venue object returned from the Locu API
 * (see https://dev.locu.com/documentation/#menu) that contains a menus attribute,
 * extract the menu items.
 *
 * @param restaurant - A venue object returned from the Locu API. It must have a menus attribute.
 * @returns An array of menu items, formatted as:
 * [
 *  {
 *    "name": String (the name of the dish),
 *    "description": String (the description of the dish),
 *    "price": Number (the price of the dish in USD),
 *    "restaurant": {
 *      "name": String (name of restaurant),
 *      "lat": Number (latitude),
 *      "lon": Number (longitude),
 *      "address": String (address)
 *    }
 *  },
 *  ...
 * ]
 */
var menu_items_for_venue = function(restaurant) {
  var r_name = null;
  var r_lat = null;
  var r_lon = null;
  var r_address = null;

  if (restaurant !== undefined) {
    r_name = restaurant.name;
    if (restaurant.location !== undefined) {
      if (restaurant.location.geo !== undefined && 
          restaurant.location.geo.coordinates !== undefined) {
        r_lat = restaurant.location.geo.coordinates[1];
        r_lon = restaurant.location.geo.coordinates[0];
      }
      r_address = "";
      if (restaurant.location.address1 !== undefined) {
        r_address += restaurant.location.address1;
      }
      if (restaurant.location.locality !== undefined) {
        r_address += ", " + restaurant.location.locality;
      }
      if (restaurant.location.region !== undefined) {
        r_address += ", " + restaurant.location.region;
      }
    }
  }
  if (r_address === "") {
    r_address = null;
  }

  var r_data = {
    "name": r_name,
    "lat": r_lat,
    "lon": r_lon,
    "address": r_address,
  };

  var menu_items = [];
  restaurant.menus.forEach(function(menu) {
    extract_menu_items(menu, r_data).forEach(function(menu_item) {
      menu_items.push(menu_item);
    });
  });
  return menu_items;
};

/**
 * Get the dishes near a given lat, lon within a given radius in meters.
 *
 * @param lon - Number, the longitude.
 * @param lat - Number, the latitude.
 * @param radius_meters - Number, the radius in meters.
 * @param likes - [String], a list of keywords the user likes.
 * @callback - Function, executed as callback(err, menu_items), where menu_items is an array of 
 * menu items, formatted as:
 * [
 *  {
 *    "name": String (the name of the dish),
 *    "description": String (the description of the dish),
 *    "price": Number (the price of the dish in USD),
 *    "restaurant": {
 *      "name": String (name of restaurant),
 *      "lat": Number (latitude),
 *      "lon": Number (longitude),
 *      "address": String (address)
 *    }
 *  },
 *  ...
 * ]
 */
var get_nearby_dishes = function(lon, lat, radius_meters, likes, callback) {
  var LOCU_URL = "https://api.locu.com/v2/venue/search";
  var API_KEY = "f165c0e560d0700288c2f70cf6b26e0c2de0348f";
  var request_body =  {
    "api_key" : API_KEY,
    "fields" : [ "name", "menus", "location"],
    "venue_queries" : [
      {
        "menus": { "$present": true },
        "categories": {
          "$contains_any": ["restaurants"]
        },
        "location" : {
          "geo" : {
            "$in_lat_lng_radius" : [lat, lon, radius_meters]
          }
        }
      }
    ]
  };
  request({
    "url": LOCU_URL,
    "method": "POST",
    "json": true,
    "body": request_body
  }, function(err, httpResponse, body) {
    if (err) {
      callback(err);
    } else {
      var menu_items = [];
      body.venues.forEach(function(venue) {
        menu_items_for_venue(venue).forEach(function(menu_item) {
          menu_items.push(menu_item);
        });
      });
      callback(null, menu_items);
    }
  });
};

module.exports.extract_menu_items = extract_menu_items;
module.exports.menu_items_for_venue = menu_items_for_venue;
module.exports.get_nearby_dishes = get_nearby_dishes;
