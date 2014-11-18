(function() {

$(document).on('click', '#profile', function(evt) {
    Menyou.UI.renderProfilePage();
});

$(document).on('click', '#likes-add', function(evt) {
    var input = $(this).parent().find('#likes-input');
    var like = input.val();
    if (like != '') {
        input.val('');
        update('likes', 'add', [like]);
    }
});

$(document).on('click', '.likes-remove', function(evt) {
    var like = $(this).parent().find('.content')[0].innerHTML;
    update('likes', 'remove', [like]);
});

$(document).on('click', '#dislikes-add', function(evt) {
    var input = $(this).parent().find('#dislikes-input');
    var dislike = input.val();
    if (dislike != '') {
        input.val('');
        update('dislikes', 'add', [dislike]);
    }
});

$(document).on('click', '.dislikes-remove', function(evt) {
    var dislike = $(this).parent().find('.content')[0].innerHTML;
    update('dislikes', 'remove', [dislike]);
});

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
    
    // var token = $.cookie(Menyou.COOKIE_NAME);
    var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNTQ2YTMxMWE0OWNiNjM0ODMwYmEzZDhhIiwiZXhwaXJlcyI6MTQxNjMzNDQ0MzU0OH0.U8L7sTHkYiNjbLC5rMOzwYfvKXUmNTltvuQIHUnC7e0";
    Menyou.APIHelper.updateTasteProfile(updates, token, function(response) {
        Menyou.UI.renderProfilePage();
    });
}

})();
