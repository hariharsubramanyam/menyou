
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var passport = require('../config/passport');
var resHelper = require('../helpers/response-helper.js');
var tokenHelper = require('../helpers/token-helper.js');

router.get('/dishes',
  passport.authenticate('bearer', {session: false}),
  function(req, res) {
    res.send({message: 'hi'});
  });

router.get('/me',
  passport.authenticate('bearer', {session: false}),
  function(req, res) {

  });

router.put('/taste',
  passport.authenticate('bearer', {session: false}),
  function(req, res) {

  });

module.exports = router;
