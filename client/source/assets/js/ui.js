(function() {

  Menyou.UI = {};

  Menyou.UI.render = function(template, context) {
    var data = context || {};
    $('body').html(Menyou.templates[template](data));
  };

  Menyou.UI.renderProfilePage = function() {
    // var token = $.cookie(Menyou.COOKIE_NAME);
    // var username = $.cookie(Menyou.USERNAME)
    var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNTQ2YTMxMWE0OWNiNjM0ODMwYmEzZDhhIiwiZXhwaXJlcyI6MTQxNjMzNDQ0MzU0OH0.U8L7sTHkYiNjbLC5rMOzwYfvKXUmNTltvuQIHUnC7e0";
    var username = "daniman";

    Menyou.APIHelper.getTasteProfile(token, function(tasteProfile) {
        Menyou.UI.render('profile', {
            username: username,
            likes: tasteProfile.content.likes,
            dislikes: tasteProfile.content.dislikes
        });
    })
  }

})();
