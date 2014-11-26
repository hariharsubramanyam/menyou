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
    $(document).on('click', '.likes-remove', function(evt) {
        var like = $(this).parent().find('.content')[0].innerHTML.toLowerCase();
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
    $(document).on('click', '.dislikes-remove', function(evt) {
        var dislike = $(this).parent().find('.content')[0].innerHTML.toLowerCase();
        update('dislikes', 'remove', [dislike]);
    });

    /**
     * Add an source to the forbidden list.
     */
    $(document).on('click', '.restrictions-forbid', function(evt) {
        var source = $(this).parent().find('.content')[0].innerHTML.toLowerCase();
        update('forbidden', 'add', Menyou.Mappings[source]);
    });

    /**
     * Remove a source from the forbidden list.
     */
    $(document).on('click', '.restrictions-unforbid', function(evt) {
        var source = $(this).parent().find('.content')[0].innerHTML.toLowerCase();
        update('forbidden', 'remove', Menyou.Mappings[source]);
    });

    /**
     * Helper function to update the User Taste Profile.
     *
     * @param field - The field can be 'likes', 'dislikes', or 'forbidden'.
     * @param action - The action can be 'add' or 'remove'.
     * @param content - An array representing the content to be updated in the taste profile.
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
            //TODO: some sort of error handling here?
            //      specifically, what happends if token expires, etc?
            Menyou.UI.render('profile');
        });
    }

    /**
     * Handlebars helper function
     * Checks that the keyword is forbidden.
     */
    Handlebars.registerHelper('isChecked', function(elem, forbidden, options) {
        var compare = Menyou.Mappings[elem];
        for (var i=0; i<compare.length; i++) {
            if (forbidden.indexOf(compare[i]) == -1) {
                return options.inverse(this);
            }
        } return options.fn(this);
    });

    /**
     * Handlebars helper function
     * Checks that the keyword is not forbidden.
     */
    Handlebars.registerHelper('isNotChecked', function(elem, forbidden, options) {
        var compare = Menyou.Mappings[elem];
        for (var i=0; i<compare.length; i++) {
            if (forbidden.indexOf(compare[i]) == -1) {
                return options.fn(this);
            }
        } return options.inverse(this);
    });

})();
