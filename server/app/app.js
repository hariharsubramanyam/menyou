
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');

// load configurations for mongodb and passport
var passport = require('./config/passport');
var db = require('./config/mongodb');
var logger = require('./config/logger');

// save all the model classes into a single object
var model = {
  User: require('./models/user')
};

// create the express app that we will attach
// all our middleware to
var app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(function(req, res, next) {
  req.model = model;
  next();
});

app.use('/api', require('./controllers/index'));
app.use('/api/auth', require('./controllers/auth'));

app.use('/*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '../../client/build/')});
});


module.exports = app;
