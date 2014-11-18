/**
 * Event handlers for the profile page.
 *
 * Author: daniman
 */

(function() {

    /**
     * Add a like to the list
     */
    $(document).on('click', '#likes-add', function(evt) {
        var input = $(this).parent().find('#likes-input');
        var like = input.val();
        if (like != '') {
            input.val('');
            update('likes', 'add', [like]);
        }
    });

    /**
     * Remove a like from the list
     */
    $(document).on('click', '.likes-remove', function(evt) {
        var like = $(this).parent().find('.content')[0].innerHTML;
        update('likes', 'remove', [like]);
    });

    /**
     * Add a dislike to the list
     */
    $(document).on('click', '#dislikes-add', function(evt) {
        var input = $(this).parent().find('#dislikes-input');
        var dislike = input.val();
        if (dislike != '') {
            input.val('');
            update('dislikes', 'add', [dislike]);
        }
    });

    /**
     * Remove a dislike from the list
     */
    $(document).on('click', '.dislikes-remove', function(evt) {
        var dislike = $(this).parent().find('.content')[0].innerHTML;
        update('dislikes', 'remove', [dislike]);
    });

    /**
     * Toggle an allergy from the allergy list
     */
    $(document).on('click', '.checkbox', function(evt) {
        if ($(this)[0].checked) {
            // add to taste profile restrictions
            console.log('add ' + $(this)[0].value);
        } else {
            // remove from taste profile restrictions
            console.log('remove ' + $(this)[0].value);
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

        //TODO update local state

        Menyou.APIHelper.updateTasteProfile(updates, Menyou.state.token, function(response) {
            //TODO: some sort of error handling here?
            //      specifically, what happends if token expires, etc?
            Menyou.UI.render('profile');
        });
    }

})();