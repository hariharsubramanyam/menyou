(function() {

  Menyou.UI = {};

  Menyou.UI.render = function(template, context) {
    var data = context || {};
    $('body').html(Menyou.templates[template](data));
  };

  Menyou.UI.renderProfilePage = function() {
    var token = $.cookie(Menyou.COOKIE_NAME);
    var username = $.cookie(Menyou.USERNAME)

    Menyou.APIHelper.getTasteProfile(token, function(tasteProfile) {
        console.log(tasteProfile);
        Menyou.UI.render('profile', {
            username: username,
            likes: tasteProfile.content.likes,
            dislikes: tasteProfile.content.dislikes,
            allergies: Menyou.AllergyKeywords.allergies,
            forbidden: tasteProfile.content.forbidden
        });
    })
  }

})();
