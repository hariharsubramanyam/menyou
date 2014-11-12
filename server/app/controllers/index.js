
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var resHelper = require('../helpers/response-helper.js');
var tokenHelper = require('../helpers/token-helper.js');

router.get('/',
  passport.authenticate('bearer', {session: false}),
  function(req, res) {
    res.send({message: 'hi'});
  });

router.get('/token',
  passport.authenticate('local', {session: false}),
  function(req, res) {
    var token = tokenHelper.create(req.user);
    resHelper.send_success_response(res, 'Successfully obtained token', {
      user: req.user,
      token: token
    });
  });

module.exports = router;
