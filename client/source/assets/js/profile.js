(function() {

Handlebars.registerHelper('isChecked', function(elem, forbidden, options) {
    var compare = Menyou.AllergyKeywords[elem];
    for (var i=0; i<compare.length; i++) {
        if (forbidden.indexOf(compare[i]) == -1) {
            return options.inverse(this);
        }
    } return options.fn(this);
});

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
    
    var token = $.cookie(Menyou.COOKIE_NAME);
    Menyou.APIHelper.updateTasteProfile(updates, token, function(response) {
        Menyou.UI.renderProfilePage();
    });
}

})();
