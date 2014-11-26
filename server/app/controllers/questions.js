/**
 * Lead Author: Harihar
 *
 * Route for getting the questions data.
 */
var express = require('express');
var router = express.Router();
var resHelper = require('../helpers/response-helper.js');

/**
 * We'll load the questions into main memory so that we don't need to go to the database each time
 * a request is made. This is reasonable because the number of questions is (and always will be)
 * small - after all, we need to write them by hand.
 */
var questions = null;

// Helper for creating random question. It assumes questions !== null.
var create_random_question = function() {
  var keyword = questions[Math.floor((Math.random() * questions.length))];
  var question = {
    "question_text": "What are your thoughts on " + keyword + "?",
    "keyword": keyword,
    "answers": [
      {
        "answer_text": "I like it",
        "modify_list": "likes" 
      },
      {
        "answer_text": "I don't mind it",
        "modify_list": null
      },
      {
        "answer_text": "I don't like it",
        "modify_list": "dislikes" 
      },
      {
        "answer_text": "I hate it",
        "modify_list": "forbidden" 
      }
    ],
  };
  return question;
}

/**
 * Get a random question to ask the user.
 *
 * Request: 
 * GET /api/questions/random
 *
 * Response:
 *
 * On success:
 * {
 *  "success": true,
 *  "message": "Question",
 *  "content": {
 *    "question_text": "What are your thoughts about <Keyword>?",
 *    "keyword": String,
 *    "answers": [
 *      {
 *        "answer_text": "I like it",
 *        "modify_list": "likes" 
 *      },
 *      {
 *        "answer_text": "I don't mind it",
 *        "modify_list": null
 *      },
 *      {
 *        "answer_text": "I don't like it",
 *        "modify_list": "dislikes" 
 *      },
 *      {
 *        "answer_text": "I hate it",
 *        "modify_list": "forbidden" 
 *      }
 *    ],
 *  }
 * }
 *
 * On error, the "success" field will be false.
 */
router.get("/random", function(req, res) {
  // If the questions are in main memory, randomly select one and return it.
  // Otherwise, fetch them from the database.
  if (questions !== null) {
    resHelper.success(res, "Question", create_random_question());
  } else {
    // Note there is no harm in getting all the questions, because we (menyou team) are the ones
    // who create them, so we know exactly how many there are. Furthermore, the number of mappings
    // will be small, so there is no risk in searching for them all and returning them to the user.
    req.model.Question.find({}, function(err, question_objects) {
      // Remove extraneous fields like the version number and id
      questions = [];
      question_objects.forEach(function(question_object) {
        questions.push(question_object.keyword);
      });

      if (err) {
        resHelper.error(res, err);
      } else {
        resHelper.success(res, "Question", create_random_question());
      } // else
    }); // find
  } // else
}); // router get

module.exports = router;
