/**
 * Lead Author: Harihar
 */

(function() {
  var question;

  // Get a random question and display it.
  var create_question = function() {
    Menyou.APIHelper.getQuestion(function(data) {
      question = data.content;
      // Display the question text.
      $(".question_text").text(question.question_text);

      // Iterate through each of the 4 answers.
      for (var i = 0; i < 4; i++) {
        // Set the answer text.
        $(".answer_" + (i + 1)).text(question.answers[i].answer_text);
        // Add a property indicating the index of the answer.
        $(".answer_" + (i + 1)).attr("data-answer-num", i);
      }
    });
  };

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
      Menyou.APIHelper.updateTasteProfile(updates, Menyou.state.token, function() {
        create_question();
      });
    } else {
      create_question();
    }
  });

  var QuestionCtrl = {};
  QuestionCtrl.create_question = create_question;
  Menyou.QuestionCtrl = QuestionCtrl;
})();
