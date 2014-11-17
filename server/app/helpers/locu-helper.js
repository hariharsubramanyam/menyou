/**
 * Lead Author: Harihar
 *
 * Helper for communicating with Locu API and parsing results.
 */

var request = require("request");
var secrets = require("../config/secrets.js");

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
        // Fill in null for any fields that don't exist.
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

  // Check the restaurant for the name, latitude, longitude, and address.
  // There are many if statements below because we don't want to access undefined values.
  if (restaurant !== undefined) {
    r_name = restaurant.name;
    if (restaurant.location !== undefined) {
      if (restaurant.location.geo !== undefined && 
          restaurant.location.geo.coordinates !== undefined) {
        r_lat = restaurant.location.geo.coordinates[1];
        r_lon = restaurant.location.geo.coordinates[0];
      }
      // The address will be: address1, locality, region
      // For example, 1 Main St, Cambridge, MA
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

  // Iterate through each menu for the restaurant.
  var menu_items = [];
  restaurant.menus.forEach(function(menu) {
    // Extract the menu items from the restaurant and add them to the list.
    extract_menu_items(menu, r_data).forEach(function(menu_item) {
      menu_items.push(menu_item);
    });
  });
  return menu_items;
};

/*
 * Select n random elements from arr (without replacement). If n is larger than the number of 
 * elements in arr, the elements of arr will be copied into a new array, shuffled, and returned.
 *
 * @param arr - The array
 * @parmam n - Number, the number of elements to select.
 */
var choose_n = function(arr, n) {
  // Helper function to randomly generate number from 0...max-1
  var randint = function(max) {
    return Math.floor(Math.random() * max);
  }

  // Shuffle arr
  var tmp;
  var rand_ind;
  for (var i = 0; i < arr.length; i++) {
    // Switch arr[i] with arr[rand_ind]
    rand_ind = randint(arr.length);
    tmp = arr[rand_ind];
    arr[rand_ind] = arr[i];
    arr[i] = tmp;
  }

  // Copy min(n, arr.length) elements from arr into result.
  var result = [];
  n = Math.min(n, arr.length);
  for (var i = 0; i < n; i++) {
    result[i] = arr[i];
  }
  return result;
}

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
  
  // Make NUM_EXTRA_CALLS calls to the API with some of the liked keywords.
  var NUM_EXTRA_CALLS = 2;

  // Search for restaurants with menus near the given location within the given radius.
  // Retrieve the name, menus, and location for the restaurants.

  // This will store the menu items near the user.
  var menu_items = [];

  // Helper function to make API calls given an optional search term.
  var make_request = function(cb, search_term) {
    var request_body =  {
      "api_key" : secrets.LOCU_API_KEY,
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
    // If there is a search term, modify the query.
    if (search_term !== undefined) {
      request_body.menu_item_queries = [{"name" : search_term}];
    } 

    // Used to ensure that we don't duplicate menu items.
    // key = menu_item.name + menu_item.restaurant.name
    // value = true
    var used_menu_items = {};
    
    // Make the API call.
    request({
      "url": LOCU_URL,
      "method": "POST",
      "json": true,
      "body": request_body
    }, function(err, httpResponse, body) {
      if (err) {
        callback(err);
      } else {
        // Iterate through each restaurant.
        body.venues.forEach(function(venue) {
          // Get the menu items for the restaurant and add it to teh list of menu items.
          menu_items_for_venue(venue).forEach(function(menu_item) {
            if (!used_menu_items[menu_item.name + menu_item.restaurant.name]) {
              menu_items.push(menu_item);
              used_menu_items[menu_item.name + menu_item.restaurant.name] = true;
            } 
          });
        });

        // Trigger the callback
        cb(null);
      }
    });
  };


  // Choose some likes to use as seach terms.
  var chosen_likes = choose_n(likes, NUM_EXTRA_CALLS);

  // Append an undefined so that we make a call without search term.
  chosen_likes.push(undefined);

  // The total number of calls to make (no search term, and one for each chosen like)
  var num_calls = chosen_likes.length;
  var num_completed = 0;

  // Make a search for each like.
  chosen_likes.forEach(function(like) {
    make_request(function(err) {
      if (err) {
        callback(err);
      } else {
        num_completed += 1;
        if (num_completed === chosen_likes.length) {
          callback(null, menu_items);
        }
      }
    }, like);
  });
};

module.exports.extract_menu_items = extract_menu_items;
module.exports.menu_items_for_venue = menu_items_for_venue;
module.exports.get_nearby_dishes = get_nearby_dishes;
