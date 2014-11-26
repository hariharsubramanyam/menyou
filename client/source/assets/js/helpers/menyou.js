/**
 *
 */

Menyou.APIHelper = {};

/**
 * Get a token for the given username and password.
 *
 * @param username - The username of the user.
 * @param password - The password of the user.
 * @param callback - Executed as callback(data). See API doc for /api/auth/token for response.
 */
Menyou.APIHelper.getToken = function(username, password, callback) {
  $.ajax({
    url: '/api/auth/token',
    type: 'POST',
    headers: {
      'Accept': 'appliction/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8'
    },
    data: JSON.stringify({
      username: username,
      password: password
    }),
    statusCode: Menyou.APIHelper.responseHandlers(callback)
  });
};

/**
 * Register a new user.
 *
 * @param username - The username of the user.
 * @param password - The password for the user
 * @param callback - Executed as callback(data). See API doc for /api/auth/register for response.
 */
Menyou.APIHelper.register = function(username, password, callback) {
  $.ajax({
    url: '/api/auth/register',
    type: 'POST',
    headers: {
      'Accept': 'appliction/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8'
    },
    data: JSON.stringify({
      username: username,
      password: password
    }),
    statusCode: Menyou.APIHelper.responseHandlers(callback)
  });
};

/**
 * Check that the token is valid.
 *
 * @param token - The token string.
 * @param callback - Executed as callback(data). See API doc for /api/auth/validate for response.
 */
Menyou.APIHelper.validateToken = function(token, callback) {
  $.ajax({
    url: '/api/auth/validate',
    type: 'GET',
    headers: {
      'Accept': 'appliction/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + token
    },
    statusCode: Menyou.APIHelper.responseHandlers(callback)
  });
};

/**
 * Get the recommended dishes for the current user.
 *
 * @param latitude - The latitude of the user's location.
 * @param longitude - The longitude of the user's location.
 * @param radius_meters - The search radius, in meters.
 * @param token - The token string.
 * @param callback - Executed as callback(data). See API doc for /api/dishes for response.
 */
Menyou.APIHelper.getDishes = function(latitude, longitude, radius_meters, token, callback) {
  $.ajax({
    url: '/api/dishes/?lat=' + latitude + "&lon=" + longitude + "&radius=" + radius_meters,
    type: 'GET',
    headers: {
      'Accept': 'appliction/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + token
    },
    statusCode: Menyou.APIHelper.responseHandlers(callback)
  });
};

/**
 * Get the taste profile for the current user.
 *
 * @param token - The token string.
 * @param callback - Executed as callback(data). See API doc for /api/taste for response.
 */
Menyou.APIHelper.getTasteProfile = function(token, callback) {
  $.ajax({
    url: '/api/taste',
    type: 'GET',
    headers: {
      'Accept': 'appliction/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + token
    },
    statusCode: Menyou.APIHelper.responseHandlers(callback)
  });
};

/**
 * Update the taste profile for the current user. 
 *
 * @param updates - The updates to the taste profile, must take the form:
 * {
 *  "likes: {
 *    "add": ["keyword",...],
 *    "remove: ["keyword",...],
 *  },
 *  "dislikes: {
 *    "add": ["keyword",...],
 *    "remove: ["keyword",...],
 *  },
 *  "forbidden: {
 *    "add": ["keyword",...],
 *    "remove: ["keyword",...],
 *  },
 * }
 * @param token - The token string.
 * @param callback - Executed as callback(data). See API doc for /api/taste for response.
 */
Menyou.APIHelper.updateTasteProfile = function(updates, token, callback) {
  $.ajax({
    url: '/api/taste',
    type: 'PUT',
    headers: {
      'Accept': 'appliction/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + token
    },
    data: JSON.stringify(updates),
    statusCode: Menyou.APIHelper.responseHandlers(callback)
  });
};

/**
 * Get the Mappings. A Mapping associates a source keyword (ex. "dairy") with targets (ex. "milk",
 * "yogurt", "cheese").
 */
Menyou.APIHelper.getMappings = function(callback) {
  $.ajax({
    url: 'api/mappings',
    type: 'GET',
    headers: {
      'Accept': 'appliction/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8',
    },
    statusCode: Menyou.APIHelper.responseHandlers(callback)
  });
};

/**
 * Get a random Question.
 */
Menyou.APIHelper.getQuestion = function(token, callback) {
  $.ajax({
    url: 'api/questions/random',
    type: 'GET',
    headers: {
      'Accept': 'appliction/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + token
    },
    statusCode: Menyou.APIHelper.responseHandlers(callback)
  });
};

/**
 * Respond to error codes, and if there are none, trigger the callback.
 *
 * @param callback - Executed as callback(data) if there is no error.
 */
Menyou.APIHelper.responseHandlers = function(callback) {
  return {
    200: function(data) {
      // console.log(data);
      callback(data);
    },
    304: function(jqxhr) {
      console.log(jqxhr);
    },
    401: function(jqxhr) {
      console.log(jqxhr);
    },
    404: function(jqxhr) {
      console.log(jqxhr);
    },
    500: function(jqxhr) {
      console.log(jqxhr);
    }
  };
};
