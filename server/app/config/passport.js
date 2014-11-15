
var mongoose = require('mongoose-q')();
var bcrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var token_helper = require('../helpers/token-helper');
var secrets = require("../config/secrets.js");

var User = require('../models/user');

// Email/Password authentication.
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {
    User.
      findOne({ "username": username})
      .execQ()
      .then(function(user) {
        if(!user && !bcrypt.compareSync(password, user.password))
          return done(null, false, { message: 'Invalid login credentials.' });
        return done(null, user);
      })
      .catch(function(err) {
        return done(err);
      })
      .done();

  }
));

// Token authentication
passport.use(new BearerStrategy(
  function(token, done) {
    token_helper.verify(token)
      .then(function(user) {
        if(!user)
          return done(new Error('Token invalid'));
        return done(null, user);
      })
      .catch(function(err) {
        return done(err);
      })
      .done();
  }
));

module.exports = passport;
