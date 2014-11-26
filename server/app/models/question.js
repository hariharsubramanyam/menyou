/**
 * Lead Author: Harihar
 *
 * The model for a Question.
 *
 * A Question takes the form:
 *
 * "What are your thoughts about <Keyword>?"
 * 
 * and the possible answers are:
 *
 * "I like it",
 * "I don't mind it",
 * "I don't like it",
 * "I hate it"
 *
 * Since the Question has fixed format, we only need to store the <Keyword> in the database.
 * 
 * Thus, our model is very simple. The reason we have gone through the effort of making it a model
 * (instead of a flat file) is 
 * 1) so that it is clear that it is important data that our app uses,
 * 2) so that we can potentially add more to the Question model later on, 
 * 3) to enforce uniqueness
 */
var mongoose = require("mongoose");

var questionSchema = mongoose.Schema({
  keyword: {
    type: String,
    index: true,
    unique: true,
    required: "A question must have a keyword",
    dropDups: true
  }
});

var Question = mongoose.model("Question", questionSchema);

module.exports = Question;
