
var jwt = require('jwt-simple');
var moment = require('moment');
var User = require('../models/user');

var token_secret = 'this_is_a_secret';

// create an access token for the given user
var create_token = function(user) {

  // set token expiration date as one day from now
  var expiration_days = 1;
  var expires = moment().add('days', expiration_days).valueOf();

  // encode the token with some identifying information
  var token = jwt.encode({
    user_id: user.id,
    expires: expires
  }, token_secret);

  return token;
};

// verify the given access token
// return a promise for a boolean
var verify_token = function(token, callback) {
  try {
    var decoded_token = jwt.decode(token, token_secret);
    User.findOne({"_id": decoded_token.user_id}, function(err, user) {
      if (err) {
        callback(err);
      } else if (!user) {
        callback("User does not exist");
      } else if (decoded_token.expires <= Date.now) {
        callback("Token has expired");
      } else {
        callback(null, user);
      }
    });
  } catch(err) {
    callback("Failed to decode token");
  }
};

module.exports = {
  create: create_token,
  verify: verify_token
};


