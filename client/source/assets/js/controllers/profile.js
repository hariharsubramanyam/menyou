/**
 * Event handlers for the profile page.
 *
 * Author: daniman
 */

(function() {

    /**
     * Show the user some recommended meals.
     */
    $(document).on("click", "#btn_profile_recommend", function() {
      Menyou.UI.render('index');
      Menyou.Map.initialize(); //TODO see nav.js
    });

    /**
     * Add a like to the list
     */
    $(document).on('change', '#likes-input', function(evt) {
        var like = $(this).val().toLowerCase();
        update('likes', 'add', [like]);
        $(this).val('');
    });

    /**
     * Remove a like from the list
     */
    $(document).on('click', '.likes-remove', function(evt) {
        var like = $(this).parent().find('.content')[0].innerHTML.toLowerCase();
        console.log(like);
        update('likes', 'remove', [like]);
    });

    /**
     * Add a dislike to the list
     */
    $(document).on('change', '#dislikes-input', function(evt) {
        var dislike = $(this).val().toLowerCase();
        update('dislikes', 'add', [dislike]);
        $(this).val('');
    });

    /**
     * Remove a dislike from the list
     */
    $(document).on('click', '.dislikes-remove', function(evt) {
        var dislike = $(this).parent().find('.content')[0].innerHTML.toLowerCase();
        update('dislikes', 'remove', [dislike]);
    });

    /**
     * Toggle an allergy from the allergy list
     */
    $(document).on('click', '.checkbox', function(evt) {
        var allergy = $(this)[0].value;
        if ($(this)[0].checked) {
            update('forbidden', 'add', Menyou.AllergyKeywords[allergy]);
        } else {
            update('forbidden', 'remove', Menyou.AllergyKeywords[allergy]);
        }
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
            console.log(response);
            Menyou.UI.render('profile');
        });
    }

    //TODO: cleaner way of doing this?
    Handlebars.registerHelper('isChecked', function(elem, forbidden, options) {
        var compare = Menyou.AllergyKeywords[elem];
        for (var i=0; i<compare.length; i++) {
            if (forbidden.indexOf(compare[i]) == -1) {
                return options.inverse(this);
            }
        } return options.fn(this);
    });

})();
