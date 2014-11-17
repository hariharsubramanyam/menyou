/**
 * Lead Author: Harihar
 *
 * Routes for registering, getting a token, and validating a token.
 */
var express = require('express');
var async = require("async");
var router = express.Router();
var bcrypt = require('bcrypt');
var passport = require('../config/passport');
var resHelper = require('../helpers/response-helper.js');
var tokenHelper = require('../helpers/token-helper.js');
var secrets = require("../config/secrets.js");

/**
 * Create a session token.
*
 * Request: POST /api/auth/token
 * 
 * Headers: Content-Type: application/json
 *
 * Body:
 * {
 * "username": String,
 * "password": String
 * }
 *
 * Response:
 * On success:
 *
 * {
 *  “success”: true,
 *  “message”: “Successfully obtained token”,
 *  “content”: {
 *    “token”: String,
 *    “username”: String
 *  }
 * }
 *
 * On credentials incorrect, return 401 Unauthorized error.
 */
router.post('/token',
  passport.authenticate('local', {session: false}),
  function(req, res) {
    var token = tokenHelper.create(req.user);
    resHelper.success(res, 'Successfully obtained token', {
      "token": token,
      "username": req.user.username
    });
  });

/**
 * Creates account and gets session token.
 * 
 * Request: POST /api/auth/register
 *
 * Headers: Content-Type: application/json
 *
 * Body:
 * {
 * "username": String,
 * "password": String
 * }
 *
 * Response:
 * On success:
 * {
 *  "success": true,
 *  "message": "Successfully registered",
 *  "content": {
 *    "token": String,
 *    "username": String
 *  }
 * }
 *
 * On username already exists:
 * {
 *  "success": false,
 *  "message": "Username already exists!"
 * }
 */
router.post('/register',
  function(req, res) {
    async.waterfall([
      // Step 1: Ensure that the username does not exist.
      function(callback) {
        req.model.User.findOne({"username": req.body.username}, function(err, user) {
          if (err) {
            callback(err);
          } else if (user) {
            callback("Username already exists!");
          } else {
            callback(null);
          } // else
        }); // findOne
      }, 
      // Step 2: Generate salt.
      function(callback) {
        bcrypt.genSalt(secrets.SALT, callback);
      },
      // Step 3: Hash password.
      function(salt, callback) {
        bcrypt.hash(req.body.password, salt, callback);
      },
      // Step 4: Save user.
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
              "username": user.username
            }); // callback
          } // else
        }); // save
      }, // step 3
    ], function(err, result) {
      if (err) {
        resHelper.failure(res, 200, err);
      } else {
        resHelper.success(res, "Successfully registered", result);
      }
    }); // final callback
  });

/**
 * Check if the token is valid.
 *
 * Request:
 * GET /api/auth/validate
 *
 * Headers:
 * Content-Type: application/json
 * Authorization: Bearer <token>
 *
 * Response:
 * On success,
 * {
 *  "success": true,
 *  "message": "Valid token",
 *  "content": {
 *    "username": String
 *   }
 * }
 *
 * On invalid token, return 401 Unauthorized error.
 */
router.get('/validate',
  passport.authenticate('bearer', {session: false}),
  function(req, res) {
    resHelper.success(res, 'Valid token', {
      "username": req.user.username
    });
  });

module.exports = router;
