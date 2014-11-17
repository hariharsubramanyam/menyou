$(document).on('click', '#likes-add', function(evt) {
    var input = $(this).parent().find('#likes-input');
    var newLike = input.val();
    input.val('');
    if (newLike != '') {
        console.log(newLike);
        console.log('woohoo')
    }
});

$(document).on('click', '#dislikes-add', function(evt) {
    var input = $(this).parent().find('#dislikes-input');
    var newDislike = input.val();
    input.val('');
    if (newDislike != '') {
        console.log(newDislike);
        console.log('woohoo')
    }
});