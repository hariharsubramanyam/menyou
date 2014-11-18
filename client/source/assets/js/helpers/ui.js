/**
 * Methods for rendering the user interface.
 *
 * Author: rchipman, daniman
 */

(function() {

  Menyou.UI = {};

  /**
   * Renders the UI with the given template, and the
   * state that is defined in Menyou.state.
   *
   * @param template - the name of the template to render.
   */
  Menyou.UI.render = function(template) {
    $('body').html(Menyou.templates[template](Menyou.state));
  };

})();
