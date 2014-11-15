var FuzzySet = require("fuzzyset.js");
/**
 * Recommend dishes for a given taste profile.
 *
 * @param menu_items - The array of dishes, should take the form: 
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
 * @param taste_profile - The taste profile for the user, should take the form:
 * {
 *  "likes": [String] (the liked keywords),
 *  "dislikes": [String] (the disliked keywords),
 *  "forbidden": [String] (the forbidden keywords)
 * }
 * @return - A list of dishes that have been recommended. Each dish will be augmented with a 
 *           property "points", which is the number of points that the dish has been assigned. The
 *           more points, the more highly recommended the dish is.
 */
var recommend = function(menu_items, taste_profile) {

  // Vary from 0 to 1. This is the number returned by fuzzyset.get(someval). Read about what
  // that means on http://glench.github.io/fuzzyset.js/ 
  var FUZZY_MATCH_THRESHOLD = 0.7;

  // Return at most NUM_ELEMENTS_RETURNED recommendations.
  var NUM_ELEMENTS_RETURNED = Math.min(menu_items.length, 20);

  // Helper function to check if the fuzzyset contains the value.
  // Returns 1 if the set contains the value and 0 otherwise.
  var contains = function(fuzzyset, val) {
    if (fuzzyset.length() === 0) return 0;
    var match = fuzzyset.get(val);
    if (match !== null && match[0][0] >= FUZZY_MATCH_THRESHOLD) {
      return 1;
    } else {
      return 0;
    }
  };

  // Create fuzzy sets for each aspect of the taste profile.
  var like_set = FuzzySet(taste_profile.likes);
  var dislike_set = FuzzySet(taste_profile.dislikes);
  var forbidden_set = FuzzySet(taste_profile.forbidden);
  
  // Set array of recommended meals.
  var recommended = [];

  // Iterate through each menu item.
  menu_items.forEach(function(menu_item) {

    // Tokenize the name + description.
    var tokens = (menu_item.name + " " + menu_item.description).split(" ");
    var isForbidden = false;
    var points = 0;

    // Iterate through each token.
    tokens.forEach(function(token) {
      // Check for forbidden token to forbid the meal.
      if (contains(forbidden_set, token) === 1) {
        isForbidden = true;
      } else if (!isForbidden) {
        // Update the points.
        points += contains(like_set, token) - contains(dislike_set, token);
      }
    }); // forEach token

    // Consider the dish only if it isn't forbidden.
    if (!isForbidden) {
      menu_item.points = points;
      recommended.push(menu_item);
    }
  }); // forEach menu_item

  // Sort the recommendations in descending order by points.
  recommended.sort(function(a, b) {
    return b.points - a.points;
  });

  // Return only the first NUM_ELEMENTS_RETURNED recommended dishes.
  return recommended.slice(0, NUM_ELEMENTS_RETURNED);
};

module.exports.recommend = recommend;
