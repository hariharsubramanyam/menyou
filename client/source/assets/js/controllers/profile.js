/**
 * Event handlers for the profile page.
 *
 * Author: daniman
 */

(function() {

    /**
     * Show the user some recommended meals (redirect them back to the home page).
     */
    $(document).on("click", "#btn_profile_recommend", function() {
      Menyou.UI.render('index');
      Menyou.Map.initialize(); //TODO see nav.js
    });

    /**
     * Add a like to the like list.
     */
    $(document).on('change', '#likes-input', function(evt) {
        var like = $(this).val().toLowerCase();
        update('likes', 'add', [like]);
        $(this).val('');
    });

    /**
     * Remove a like from the like list.
     */
    $(document).on('click', '#likes-container ul li', function(evt) {
        var like = $(this).find('.content')[0].innerHTML.toLowerCase();
        console.log(like);
        update('likes', 'remove', [like]);
    });

    /**
     * Add a dislike to the disike list.
     */
    $(document).on('change', '#dislikes-input', function(evt) {
        var dislike = $(this).val().toLowerCase();
        update('dislikes', 'add', [dislike]);
        $(this).val('');
    });

    /**
     * Remove a dislike from the dislike list.
     */
    $(document).on('click', '#dislikes-container ul li', function(evt) {
        var dislike = $(this).find('.content')[0].innerHTML.toLowerCase();
        update('dislikes', 'remove', [dislike]);
    });

    /**
     * Add an source to the forbidden list.
     */
    $(document).on('click', '.forbid-li', function(evt) {
        var source = $(this).find('.content')[0].innerHTML.toLowerCase();
        update('forbidden', 'add', Menyou.Mappings[source]);
    });

    /**
     * Remove a source from the forbidden list.
     */
    $(document).on('click', '.unforbid-li', function(evt) {
        var source = $(this).find('.content')[0].innerHTML.toLowerCase();
        update('forbidden', 'remove', Menyou.Mappings[source]);
    });

    /**
     * Remove a source from the forbidden list.
     */
    $(document).on('click', '#restrictions-forbidden li', function(evt) {
        var source = $(this).find('.content')[0].innerHTML.toLowerCase();
        update('forbidden', 'remove', [source]);
    });

    /**
     * Helper function to update the User Taste Profile.
     *
     * @param field - The field can be 'likes', 'dislikes', or 'forbidden'.
     * @param action - The action can be 'add' or 'remove'.
     * @param content - An array representing the content to be updated in the taste profile.
     *
     * It will call the Menyou.APIHelper.updateTasteProfile(updates...)function  
     * where updates is of the form:
     * {
     *  "likes": {"add": [], "remove": []},
     *  "dislikes": {"add": [], "remove": []},
     *  "forbidden": {"add": [], "remove": []}
     * }
     * but has <content> added to the <action> list of <field>.
     */
    function update(field, action, content) {
        var updates = {
            likes: {add: [], remove: []},
            dislikes: {add: [], remove: []},
            forbidden: {add: [], remove: []}
        };

        for (var i=0; i<content.length; i++) {
            updates[field][action].push(content[i]);
        }

        Menyou.APIHelper.updateTasteProfile(updates, Menyou.state.token, function(response) {
            Menyou.UI.render('profile');
        });
    }

    /**
     * Handlebars helper function
     * Checks that the keyword is forbidden.
     */
    Handlebars.registerHelper('isChecked', function(elem, forbidden, options) {
        if (isChecked(Menyou.Mappings, elem, forbidden)) {
          return options.fn(this);
        }
        return options.inverse(this);
    });

    /**
     * Check if a dietary restriction is reflected in the forbidden list.
     *
     * @param mappings - key = string, value = array of string.
     * @param source - A key in mappings
     * @param forbidden - An array of strings.
     *
     * @return true if at least one element of forbidden appears in mappings[source]
     */
    var isChecked = function(mappings, source, forbidden) {
      var targets = mappings[source];
      for (var i = 0; i < forbidden.length; i++) {
        if (targets.indexOf(forbidden[i]) > -1) {
          return true;
        }
      };
      return false;
    };

    /********************************************
     * UNIT TESTS
     *******************************************/
    if (Menyou.shouldTest) {
      QUnit.test("profile update test", function(assert) {
        // Stub the updateTasteProfile function.
        var old_func = Menyou.APIHelper.updateTasteProfile;
        var result = {};
        Menyou.APIHelper.updateTasteProfile = function(updates, token, callback) {
          result = updates;
        };

        update("likes", "add", ["test"]);
        assert.equal(result.likes.add[0], "test");

        update("dislikes", "remove", ["test"]);
        assert.equal(result.dislikes.remove[0], "test");

        update("forbidden", "add", ["test"]);
        assert.equal(result.forbidden.add[0], "test");

        // Return updateTasteProfile to original value.
        Menyou.APIHelper.updateTasteProfile = old_func;
      });

      QUnit.test("profile is checked", function(assert) {
        var mappings = {
          "source": ["target1", "target2", "target3"]
        };
        var source = "source";
        var forbiddenChecked = ["dummy", "dummy", "target2", "dummy", "dummy", "dummy"]
        var forbiddenNotChecked = ["dummy", "dummy", "dummy"];

        // Should return true.
        assert.ok(isChecked(mappings, source, forbiddenChecked));
        
        // Should return false.
        assert.ok(!isChecked(mappings, source, forbiddenNotChecked));
      });
    }

})();
