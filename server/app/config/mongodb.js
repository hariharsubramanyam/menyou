
// We set up mongoose with the module mongoose-q
// so that we can use promises instead of callbacks
var mongoose = require('mongoose');
var connection_string = 'mongodb://localhost/menyou';

mongoose.connect(connection_string);
var db = mongoose.connection;

module.exports = db;
