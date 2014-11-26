/**
 * Helpers for managing sessions on the client side.
 *
 * Author: rchipman
 */

(function() {

  Menyou.SessionHelper = {};

  /**
   * Get the current token from cookies if exists
   *
   * @param callback - Executed as callback(success). False
   *                   if token does not exist or is invalid.
   */
  Menyou.SessionHelper.currentToken = function(callback) {
    var token = $.cookie(Menyou.COOKIE_NAME);
    if (token === undefined) {
      callback(false);
    } else {
      Menyou.APIHelper.validateToken(token, function(data) {
        if(data.success) {
          Menyou.state.username = data.content.username;
          Menyou.state.token = token;
        }
        callback(data.success);
      });
    }
  };

  /**
   * Get a new token for the user.
   *
   * @param callback - Executed as callback(success). Is false if
   *                   username and password provided are invalid.
   */
  Menyou.SessionHelper.newToken = function(username, password, callback) {
    Menyou.APIHelper.getToken(username, password, function(data) {
      if(data.success) {
        $.cookie(Menyou.COOKIE_NAME, data.content.token, {'path': '/'});
        Menyou.state.username = data.content.username;
        Menyou.state.token = data.content.token;
      }
      callback(data.success);
    });
  };

  /**
   * Clear the currently saved user session and all saved state data.
   */
  Menyou.SessionHelper.clearSession = function() {
    $.removeCookie(Menyou.COOKIE_NAME);
    Menyou.state = $.extend(true, {}, Menyou.DEFAULT_STATE);
  };

})();
