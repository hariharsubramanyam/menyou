/**
 * Event handlers for the index page.
 *
 * Author: rchipman
 */

(function() {

  /**
   * Render the index template as soon as the page is ready, since
   * index is the default view.
   */
  $(document).ready(function() {
    Menyou.UI.render('index');
  });

  /**
   * Ellipsize text (i.e. if it is too long, cut it short and add "..." at the end).
   *
   * Handlebars helper for use on the index page.
   */
  Handlebars.registerHelper('ellipsize', function(options) {
    var MAX_LENGTH = 300;
    var str = options.fn(this);
    if (str.length > MAX_LENGTH) {
      return new Handlebars.SafeString(str.substring(1, MAX_LENGTH) + "...");
    } else {
      return new Handlebars.SafeString(str);
    }
  });

})();
