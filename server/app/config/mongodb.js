/**
 * Lead Author: Ryan 
 *
 * Connect to MongoDB database.
 */
var mongo_url = require("./secrets.js").MONGO_URL;
var mongoose = require('mongoose');

mongoose.connect(mongo_url);
var db = mongoose.connection;

module.exports = db;
