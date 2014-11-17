/**
 * Lead Author: Tawanda
 *
 * Get the recommended dishes near the user.
 */
var express = require('express');
var router = express.Router();
var passport = require('../config/passport');
var resHelper = require('../helpers/response-helper.js');
var recommender = require('../helpers/recommender.js');
var locuHelper = require('../helpers/locu-helper.js');

/**
 * Recommend for the given user near the given latitude/ longitude and within the given radius.
 * Query String: ?lat=<latitude>&lon=<longitude>&radius=<radius in meters>
 * Response content:
 * The list of returned meals.
 */
router.get('/',
  passport.authenticate('bearer', {session: false}),
  function(req, res) {

    // Extract arguments from request.
    var lat = parseFloat(req.query.lat);
    var lon = parseFloat(req.query.lon);
    var radius = parseInt(req.query.radius, 10);
    var user = req.user;

    //  Callback to be executed when menu items are fetched.
    function handle_menu_items(err, menu_items){
      if (err){
        resHelper.error(res, err);
      } else{
        //get recommended meals
        var meals = recommender.recommend(menu_items, user.tasteProfile);
        //send the recommended meals to client 
        resHelper.success(res, "Recommended meals", meals);
      }
    }
    //send a request to Locu for dishes
    locuHelper.get_nearby_dishes(lon, lat, radius, user.tasteProfile.likes, handle_menu_items);
  });

module.exports = router;
