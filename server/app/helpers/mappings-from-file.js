/**
 * Lead Author: Harihar
 *
 * Logic for populating the MongoDB database with a set of Mapping documents from a csv file.
 *
 * The csv file should take the following form:
 *
 * source1, target1_1, target1_2, ..., target1_n
 * ...
 *
 * Each line begins with a source keyword, and the target keywords for the source keyword 
 * follow.
 */


var fs = require("fs");

/**
 * Import mappings from the given file into the database.
 *
 * @param file_path - The path of the file
 * @param Mapping - The model which corresponds to a Mapping object.
 * @param callback - The callback to trigger when the mappings have been added. It is called as
 *                   callback(err).
 */
var import_mappings = function(file_path, Mapping, callback) {
  // Read file and create array of lines.
  var lines = fs.readFileSync(file_path).toString().split("\n");

  // Array of mappings that must be saved.
  var save_me = [];

  // Iterate through each line.
  lines.forEach(function(line) {

    // Split the line into tokens
    var tokens = line.split(",");

    // Each line must contain exactly source and one target.
    if (tokens.length <= 1) {
      return;
    }
    
    // Remove trailing and leading spaces for the tokens.
    for (var i = 0; i < tokens.length; i++) {
      tokens[i] = tokens[i].trim();
    }

    // Create the mapping and add it to the list of objects to be saved.
    var source = tokens[0];
    var targets = tokens.splice(1);
    var mapping = new Mapping({"source": source, "targets": targets});
    save_me.push(mapping);
  });

  var num_saved = 0;
  // Saves one object and launches call to save the next.
  var save_object = function() {
    if (num_saved === save_me.length) {
      callback(null);
    } else {
      // Remove the object if it already exists.
      Mapping.remove({"source": save_me[num_saved].source}, function(err, numRemoved) {
        if (err) {
          callback(err);
        } else {
          // Save the object
          save_me[num_saved].save(function(err) {
            if (err) {
              callback(err);
            } else {
              num_saved += 1;
              save_object();
            }
          });
        }
      });
    }
  };
  // Trigger the first save.
  save_object();
};


module.exports.import_mappings = import_mappings;

