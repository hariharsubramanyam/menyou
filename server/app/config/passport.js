
var mongoose = require('mongoose-q')();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

var token_helper = require('../helpers/token-helper');

var User = require('../models/user');

// Email/Password authentication.
// TODO: actually hash the password with bcrypt
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {

    User.
      findOne({ email: email })
      .execQ()
      .then(function(user) {
        if(!user)
          return done(null, false, { message: 'Invalid username.' });
        if(!user.password == password)
          return done(null, false, { message: 'Incorrect password.' });
        return done(null, user);
      })
      .catch(function(err) {
        return done(err);
      })
      .done();

  }
));

// Token authentication
// TODO: choose a better way of creating a token
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
