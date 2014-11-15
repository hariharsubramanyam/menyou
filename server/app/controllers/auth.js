
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var passport = require('../config/passport');
var resHelper = require('../helpers/response-helper.js');
var tokenHelper = require('../helpers/token-helper.js');

/**
 * Get an access token for the given user
 * Request body:
 *   TODO: figure out where username and password should go
 * Response content:
 *   token: the access token for the user whose credentials
 *          were provided with the request
 */
router.get('/token',
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
    var user = new req.model.User();

    user.username = req.body.name;

    //TODO switch to async versions of these
    // save the hashed version of the user's password
    var salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(req.body.password, salt)

    // set the default taste profile (empty)
    user.tasteProfile = {
      likes: [],
      dislikes: [],
      forbidden: []
    };

    // save the user!
    user
      .saveQ()
      .then(function(saved_user) {
        var access_token = tokenHelper.create(saved_user);
        resHelper.success(res, 'Successfully registered', {
          token: access_token,
          user: saved_user
        });
      })
      .catch(function(err) {
        resHelper.error(res, err);
      })
      .done();
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
