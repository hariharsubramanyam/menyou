
var express = require('express');
var async = require("async");
var router = express.Router();
var bcrypt = require('bcrypt');
var passport = require('../config/passport');
var resHelper = require('../helpers/response-helper.js');
var tokenHelper = require('../helpers/token-helper.js');
var secrets = require("../config/secrets.js");

/**
 * Create an access token for the given user
 * Request body:
 *  username: the username. should be unique.
 *  password: the password.
 * Response content:
 *   token: the access token for the user whose credentials
 *          were provided with the request
 */
router.post('/token',
  passport.authenticate('local', {session: false}),
  function(req, res) {
    var token = tokenHelper.create(req.user);
    resHelper.success(res, 'Successfully obtained token', {
      token: token
    });
  });

/**
 * Register a new user.
 * Request body:
 *   username: the username. should be unique
 *   password: the password.
 * Response content:
 *   token: the user's access token
 *   user: the user just created
 */
router.post('/register',
  function(req, res) {
    async.waterfall([
      // Step 1: Generate salt.
      function(callback) {
        bcrypt.genSalt(secrets.SALT, callback);
      },
      // Step 2: Hash password.
      function(salt, callback) {
        bcrypt.hash(req.body.password, salt, callback);
      },
      // Step 3: Save user.
      function(hash, callback) {
        var user = new req.model.User();

        // set the default taste profile (empty)
        user.tasteProfile = {
          likes: [],
          dislikes: [],
          forbidden: []
        };
        user.hash_password = hash;
        user.username = req.body.username;

        user.save(function(err) {
          if (err) {
            callback(err);
          } else {
            var access_token = tokenHelper.create(user);
            callback(null, {
              "token": access_token,
              "user": user
            }); // callback
          } // else
        }); // save
      }, // step 3
    ], function(err, result) {
      if (err) {
        resHelper.error(res, err);
      } else {
        resHelper.success(res, result);
      }
    }); // final callback
  });

/**
 * Check if a token is valid. If yes, return the user object
 * associated with that access token.
 * Request body:
 *   Nothing expected. Access token provided in the header
 * Response content:
 *   user: the user object associated with the provided
 *         access token.
 */
router.get('/validate',
  passport.authenticate('bearer', {session: false}),
  function(req, res) {
    resHelper.success(res, 'Valid token', {
      user: req.user
    });
  });

module.exports = router;
