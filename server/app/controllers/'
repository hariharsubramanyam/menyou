
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var passport = require('../config/passport');
var resHelper = require('../helpers/response-helper.js');
var tokenHelper = require('../helpers/token-helper.js');

router.get('/token',
  passport.authenticate('local', {session: false}),
  function(req, res) {
    var token = tokenHelper.create(req.user);
    resHelper.success(res, 'Successfully obtained token', {
      token: token
  });

router.post('/register',
  function(req, res) {
    
  });

router.get('/validate',
  passport.authenticate('bearer', {session: false}),
  function(req, res) {
    
  });
