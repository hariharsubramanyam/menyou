/**
 * Lead Author: Harihar
 *
 * Controller for displaying a small box where we can ask questions. The questions have a 
 * "question text" and four answers.
 */

(function() {
  var question;

  // Get a random question and display it.
  var create_question = function() {
    Menyou.APIHelper.getQuestion(Menyou.state.token, function(data) {
      if (data.success === false) {
        // Display the question text.
        $(".question_text").text("You answered all the questions!");

        // Iterate through each of the 4 answers.
        for (var i = 0; i < 4; i++) {
          // Hide the answers
          $(".answer_" + (i + 1)).hide();
        } // for
      } else {
        question = data.content;
        // Display the question text.
        $(".question_text").text(question.question_text);

        // Iterate through each of the 4 answers.
        for (var i = 0; i < 4; i++) {
          // Show the answer.
          $(".answer_" + (i + 1)).show();
          // Set the answer text.
          $(".answer_" + (i + 1)).text(question.answers[i].answer_text);
          // Add a property indicating the index of the answer.
          $(".answer_" + (i + 1)).attr("data-answer-num", i);
        } // for
      } // else
    }); // getQuestion
  }; // create_question

  // Hide the question when the X button is clicked.
  $(document).on("click", ".close_button", function() {
    $(".question_div").hide();
  });

  // Update the taste profile when the user answer a question.
  $(document).on("click", ".answer_button", function(evt) {
    // Get the index of the answer
    var answer_index = $(evt.target).attr("data-answer-num");
    var keyword = question.keyword;
    var modify_list = question.answers[answer_index].modify_list;
    var updates = create_updates(keyword, modify_list);

    if (modify_list !== null) {
      Menyou.APIHelper.updateTasteProfile(updates, Menyou.state.token, function() {
        create_question();
      });
    } else {
      create_question();
    }
  });

  /**
  * Add a keyword to taste profile updates
  * @param keyword - String
  * @param modify_list - String, the taste profile element to update
  * @return - The structure containing the updates 
  **/
  var create_updates = function(keyword, modify_list) {
    var updates = {
      "likes": {
        "add": [],
        "remove": []
      },
      "dislikes": {
        "add": [],
        "remove": []
      },
      "forbidden": {
        "add": [],
        "remove": []
      }
    };

    if (modify_list !== null) {
      updates[modify_list]["add"].push(keyword);
    }
    return updates;
  };

  var QuestionCtrl = {};
  QuestionCtrl.create_question = create_question;
  Menyou.QuestionCtrl = QuestionCtrl;

  if (Menyou.shouldTest) {
    QUnit.test("question controller create updates", function(assert) {
      // Add to likes.
      var updates = create_updates("test","likes");
      assert.equal("test", updates.likes.add[0]);

      // Make sure that null does not update anything.
      updates = create_updates("test2", null);
      assert.equal(0, updates.likes.add.length);
      assert.equal(0, updates.dislikes.add.length);
      assert.equal(0, updates.forbidden.add.length);
      assert.equal(0, updates.likes.remove.length);
      assert.equal(0, updates.dislikes.remove.length);
      assert.equal(0, updates.forbidden.remove.length);

      // Add to dislikes.
      updates = create_updates("test3", "dislikes");
      assert.equal("test3", updates.dislikes.add[0]);
    });
  }
})();
