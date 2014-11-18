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
    Menyou.Map.initialize();
    //TODO: make it so that map doesn't have to be manually initialized every time
  });

})();
