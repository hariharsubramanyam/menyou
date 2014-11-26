/**
 * Lead Author: Harihar
 *
 * Logic for populating the MongoDB database with a set of Question documents from a txt file.
 *
 * The txt file should take the following form:
 *
 * keyword1
 * keyword2
 * ...
 *
 * Each line contains a single keyword, which will be used to construct the Question.
 */

var fs = require("fs");

/**
 * Import questions from the given file into the database.
 *
 * @param file_path - The path of the file
 * @param Mapping - The model which corresponds to a Mapping object.
 * @param callback - The callback to trigger when the mappings have been added. It is called as
 *                   callback(err).
 */
var import_questions = function(file_path, Question, callback) {
  var keywords = fs.readFileSync(file_path).toString().split("\n");
  var num_saved = 0;

  // Save a question and trigger the save of the next question.
  var save_object = function() {
    while (num_saved < keywords.length && keywords[num_saved].length < 1) {
      num_saved += 1;
    }
    if (num_saved === keywords.length) {
      callback(null);
    } else {
      // Remove the question
      Question.remove({"keyword": keywords[num_saved]}, function(err) {
        if (err) {
          callback(err);
        } else {
          // Create the question and save.
          var question = new Question({"keyword": keywords[num_saved]});
          question.save(function(err, result) {
            if (err) {
              console.log(err);
              callback(err);
            } else {
              // Trigger next save.
              num_saved += 1;
              save_object();
            } // else
          }); // save
        } // else
      }); // remove
    } // else
  }; // save_object

  // Trigger the first save.
  save_object();
};

module.exports.import_questions = import_questions;
