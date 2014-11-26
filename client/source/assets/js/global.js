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
      lat: 42.358638, // MIT is default location.
      lon: -71.093345,
      radius: 1500, // in meters
      city: 'Cambridge, MA'
    }
  };

  /*location: {
      lat: 42.358638, // MIT is default location.
      lon: -71.093345,
      radius: 1500, // in meters
      city: 'Cambridge, MA'
    }*/
  // set current state as default state
  Menyou.state = $.extend(true, {}, Menyou.DEFAULT_STATE);

  Menyou.COOKIE_NAME = "token";

})();
