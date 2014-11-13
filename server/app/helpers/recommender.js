/**
 * Recommend dishes for a given taste profile.
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
};

module.exports.recommend = recommend;
