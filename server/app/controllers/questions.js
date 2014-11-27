/**
 * Lead Author: Harihar
 *
 * Route for getting the questions data.
 */
var express = require('express');
var passport = require('../config/passport');
var router = express.Router();
var resHelper = require('../helpers/response-helper.js');

/**
 * We'll load the questions into main memory so that we don't need to go to the database each time
 * a request is made. This is reasonable because the number of questions is (and always will be)
 * small - after all, we need to write them by hand.
 */
var questions = null;

// Helper for creating random question. It assumes questions !== null.
// We ensure the question does not ask questions about anything in the taste profile.
// If there are no questions that can be asked, the function returns null.
var create_random_question = function(taste_profile) {
  // Put the likes, dislikes, and forbidden of the tatse profile
  var keywords_in_taste_profile = {};
  for (var i = 0; i < taste_profile.likes.length; i++) {
    keywords_in_taste_profile[taste_profile.likes[i]] = true;
  }
  for (var i = 0; i < taste_profile.dislikes.length; i++) {
    keywords_in_taste_profile[taste_profile.dislikes[i]] = true;
  }
  for (var i = 0; i < taste_profile.forbidden.length; i++) {
    keywords_in_taste_profile[taste_profile.forbidden[i]] = true;
  }
  // Create list of possible keywords which are not in the taste profile.
  var possible_keywords = [];
  for (var i = 0; i < questions.length; i++) {
    if (keywords_in_taste_profile[questions[i]] === undefined) {
      possible_keywords.push(questions[i]);
    }
  }

  if (possible_keywords.length === 0) {
    return null;
  } else {
    // Randomly make a question.
    var keyword = possible_keywords[Math.floor((Math.random() * possible_keywords.length))];
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
router.get("/random", passport.authenticate('bearer', {session: false}), function(req, res) {
  // If the questions are in main memory, randomly select one and return it.
  // Otherwise, fetch them from the database.
  if (questions !== null) {
    var question = create_random_question(req.user.tasteProfile);
    if (question === null) {
      resHelper.failure(res, 200, "Failed to generate a question");
    } else {
      resHelper.success(res, "Question", question);
    }
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
        question = create_random_question(req.user.tasteProfile);
        if (question === null) {
          resHelper.failure(res, 200, "Failed to generate a question");
        } else {
          resHelper.success(res, "Question", question);
        }
      } // else
    }); // find
  } // else
}); // router get

module.exports = router;
