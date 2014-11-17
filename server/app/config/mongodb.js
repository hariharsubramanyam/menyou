/**
 * Lead Author: Ryan 
 *
 * Connect to MongoDB database.
 */
var mongoose = require('mongoose');
var connection_string = 'mongodb://localhost/menyou';

mongoose.connect(connection_string);
var db = mongoose.connection;

module.exports = db;
