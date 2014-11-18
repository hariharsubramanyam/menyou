/**
 * Event handlers for the navigation bar.
 *
 * Author: rchipman, daniman
 */

(function() {

  /**
   * Handler for clicking the main menyou logo.
   */
  $(document).on('click', '#logo', function(evt) {
    Menyou.UI.render('index');
    Menyou.Map.initialize(); //TODO see nav.js
  });

  /**
   * Handler for clicking the recommendation button.
   */
  $(document).on('click', '#recommendations', function(evt) {
    console.log('click!');
    Menyou.UI.render('index');
    Menyou.Map.initialize(); //TODO see nav.js
  });

  /**
   * Handler for clicking the user profile link.
   */
  $(document).on('click', '#profile', function(evt) {
    Menyou.UI.render('profile');
  });

  /**
   * Handler for when the logout button is clicked.
   */
  $(document).on('click', '#logout', function(evt) {
    Menyou.SessionHelper.clearSession();
    Menyou.UI.render('index');
  });

  $(document).on('click', '#register', function() {
    var username = $('input[name=username]').val();
    var password = $('input[name=password]').val();
    console.log(username);
    Menyou.APIHelper.register(username, password, function(data) {
      if(data.success) {
        Menyou.SessionHelper.newToken(username, password, function(success) {
          console.log("successful register");
          Menyou.UI.render('profile');
        });
      } else {
        //TODO: handle failure. Flash it
        console.log('failed register');
        alert(data.message);
      }
    });
  });

  $(document).on('click', '#login', function() {
    //TODO: some sort of form validation here
    var username = $('input[name=username]').val();
    var password = $('input[name=password]').val();
    Menyou.SessionHelper.newToken(username, password, function(success) {
      //TODO: some sort of flash here
      Menyou.UI.render('index');
    });
  });

})();
