/**
 * This file declares our Menyou namespace, as well as
 * any variables we want to be globally accessible (such
 * as our application state).
 *
 * Author: rchipman
 */

Menyou = {};

(function() {

  // define default state for application
  Menyou.DEFAULT_STATE = {
    username: null,
    token: null,
    dishes: [],
    taste: {
      likes: [],
      dislikes: [],
      forbidden: []
    },
    location: {
      lat: 42.3605419, // Boston Lat, Long as default
      lon: -71.0595503,
      radius: 5000, //TODO units?
      city: 'Boston, MA'
    }
  };

  // set current state as default state
  Menyou.state = $.extend(true, {}, Menyou.DEFAULT_STATE);

  Menyou.COOKIE_NAME = "token";

})();
