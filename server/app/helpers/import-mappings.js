/**
 * Lead Author: Harihar
 *
 * A command line program for populating the MongoDB database with a set of Mapping documents.
 *
 * The program takes two command line arguments.
 * 1: The path to csv file.
 * 2: The URL of the MongoDB database
 *
 * If the command line arguments are omitted, the program will do nothing.
 *
 * If only one argument is provided, or if the arguments are not valid (ex. the file is not
 * properly formatted, the database URL is conrrect), then no guarantees are made about program
 * behavior.
 *
 * The csv file should take the following form:
 *
 * source1, target1_1, target1_2, ..., target1_n
 * ...
 *
 * Each line begins with a source keyword, and the target keywords for the source keyword 
 * follow.
 */

var import_mappings = require("./mappings_from_file");
// If the command line args are there, parse them and import mappings from file.
if (process.argv.length === 4) {
  var file_path = process.argv[2];
  var mongo_url = process.argv[3];
  var mongoose = require("mongoose");
  var db = mongoose.connect(mongo_url).connection;
  db.on("connected", function() {
    var Mapping = require("../models/mapping.js");
    import_mappings(file_path, Mapping, function() {
      mongoose.disconnect();
    });
  });
}
