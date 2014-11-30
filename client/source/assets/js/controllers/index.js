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
    if (!Menyou.shouldTest) {
      Menyou.UI.render('index');
    }
  });

  /**
   * Ellipsize text (i.e. if it is too long, cut it short and add "..." at the end).
   *
   * Handlebars helper for use on the index page.
   */
  Handlebars.registerHelper('ellipsize', function(options) {
    var MAX_LENGTH = 300;
    var str = options.fn(this);
    return Handlebars.SafeString(ellipsize(str));
  });

  Handlebars.registerHelper('toUpperCase', function(elem) {
    return elem.toUpperCase();
  });

  var ellipsize = function(string, max_length) {
    if (string.length > max_length) {
      return string.substring(0, max_length) + "...";
    } else {
      return string;
    }
  };

  /********************************************
   * UNIT TESTS
   *******************************************/
  if (Menyou.shouldTest) {
    QUnit.test("ellipsize test", function(assert) {
      assert.equal(ellipsize("this is text", 5), "this ...");
    });
  }

})();
