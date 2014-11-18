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
    preRender[template](function() {
      $('body').html(Menyou.templates[template](Menyou.state));
      Menyou.Map.initialize();
      Menyou.Map.mark_restaurants();
    });
  };

  /**
   * These are functions that should be executed prior to rendering a given page.
   * Tasks to do here may include fetching data from the API or initializing the map.
   */
  var preRender = {

    index: function(callback) {
      // if there is no authenticated user, just return.
      Menyou.SessionHelper.currentToken(function(has_token) {
        console.log(Menyou.state);
        if (has_token) {
          console.log('getting dishes');
          // if there is an authenticated user, fetch his recommendations!
          Menyou.APIHelper.getDishes(Menyou.state.location.lat, Menyou.state.location.lon,
                                     Menyou.state.location.radius, Menyou.state.token,
                                     function(data) {
                                       //TODO handle failure case
                                       console.log('got dishes');
                                       Menyou.state.dishes = data.content;
                                       callback();
                                     });
        } else {
          callback();
        }
      });
    },

    profile: function(callback) {
      // if there is no authenticated user, just return.
      if(!Menyou.state.username) {
        callback();
        return;
      }

      Menyou.APIHelper.getTasteProfile(Menyou.state.token, function(data) {
        //TODO handle failure case
        Menyou.state.taste = data.content;
        callback();
      });

    }

  };

})();
