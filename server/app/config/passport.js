/**
 * Lead Author: Harihar
 *
 * Configure login handler and token handler for passport.
 */
var mongoose = require('mongoose');
var async = require("async");
var bcrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var token_helper = require('../helpers/token-helper');
var secrets = require("../config/secrets.js");

var User = require('../models/user');

/**
 * Username and password authentication.
 */
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {
    var INVALID_LOGIN = "Invalid login credentials.";

    async.waterfall([
      // Step 1: Look up the user.
      function(callback) {
        User.findOne({ "username": username }, function(err, user) {
          callback(err, user);
        });
      },
      // Step 2: Check that the passwords match.
      function(user, callback) {
        // If the username does not exist, then signal an error.
        if (!user) {
          callback(INVALID_LOGIN);
        } else {
        // Else check that the passwords match.
          bcrypt.compare(password, user.hash_password, function(err, passwords_match) {
            if (err) {
              callback(err);
            } else if (!passwords_match) {
              callback(INVALID_LOGIN);
            } else {
              callback(null, user);
            } // else
          }); // compare
        } // else 
      } // function 
    ], function(err, user) {
      if (err === INVALID_LOGIN) {
        return done(null, false, { "message": INVALID_LOGIN });
      } else if (err) {
        return done(err);
      } else {
        return done(null, user);
      }
    }); // final callback
  }));

/**
 * Token authentication.
 */
passport.use(new BearerStrategy(
  function(token, done) {
    token_helper.verify(token, function(err, user) {
      if (err) {
        return done(null, false, { "message": err });
      } else {
        return done(null, user);
      } // else
    }); // verity
  }));

module.exports = passport;
