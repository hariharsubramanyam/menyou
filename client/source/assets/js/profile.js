Menyou = Menyou || {};

$(document).on('click', '#likes-add', function(evt) {
    var input = $(this).parent().find('#likes-input');
    var newLike = input.val();
    input.val('');
    if (newLike != '') {
        $(this).parent().find('ul').append('<li>' + newLike + '</li>');
    }
});

$(document).on('click', '#dislikes-add', function(evt) {
    var input = $(this).parent().find('#dislikes-input');
    var newDislike = input.val();
    input.val('');
    if (newDislike != '') {
        $(this).parent().find('ul').append('<li>' + newDislike + '</li>');
    }
});

$(document).on('click', '.checkbox', function(evt) {
    if ($(this)[0].checked) {
        console.log($(this)[0].value);
    }
});
