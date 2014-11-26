/**
 * Lead Author: Ryan 
 *
 * Connect to MongoDB database.
 */
var mongoose = require('mongoose');
var mongo_url = require("./secrets.js").MONGO_URL;

mongoose.connect(mongo_url);
var db = mongoose.connection;

module.exports = db;
