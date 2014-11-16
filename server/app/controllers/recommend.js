var express = require('express');
var router = express.Router();
var passport = require('../config/passport');
var resHelper = require('../helpers/response-helper.js');
var recommender = require('../helpers/recommender.js');
var locuHelper = require('../helpers/locu-helper.js');

router.get('/',
  passport.authenticate('bearer', {session: false}),
  function(req, res) {
    var lat = parseFloat(req.query.lat);
    var lon = parseFloat(req.query.lon);
    var radius = parseInt(req.query.radius, 10);
    var user = req.user;
    //this is a callback called after getting dishes from Locu
    function handle_menu_items(err, menu_items){
      if (err){
        res.send({"success" : false})
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
