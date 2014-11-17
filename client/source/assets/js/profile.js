(function() {

$(document).on('click', '#profile', function(evt) {
    // var token = $.cookie(Menyou.COOKIE_NAME);
    // var username = $.cookie(Menyou.USERNAME)
    var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNTQ2YTMxMWE0OWNiNjM0ODMwYmEzZDhhIiwiZXhwaXJlcyI6MTQxNjMzNDQ0MzU0OH0.U8L7sTHkYiNjbLC5rMOzwYfvKXUmNTltvuQIHUnC7e0";
    var username = "daniman";

    Menyou.APIHelper.getTasteProfile(token, function(tasteProfile) {
        Menyou.UI.loadPage('profile', {
            username: username,
            likes: tasteProfile.content.likes,
            dislikes: tasteProfile.content.dislikes
        });
    })
});

$(document).on('click', '#likes-add', function(evt) {
    var input = $(this).parent().find('#likes-input');
    var newLike = input.val();

    if (newLike != '') {
        input.val('');
        $(this).parent().find('ul').append('<li>' + newLike + '</li>');
    }
});

$(document).on('click', '#dislikes-add', function(evt) {
    var input = $(this).parent().find('#dislikes-input');
    var newDislike = input.val();
    if (newDislike != '') {
        input.val('');
        $(this).parent().find('ul').append('<li>' + newDislike + '</li>');
    }
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

})();