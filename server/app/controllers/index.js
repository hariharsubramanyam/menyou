
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var passport = require('../config/passport');
var resHelper = require('../helpers/response-helper.js');
var tokenHelper = require('../helpers/token-helper.js');
var recommender = require('../helpers/recommender.js');
var locuHelper = require('../helpers/locu-helper.js');
var User = require("./../models/user");
// router.get('/dishes',
//   passport.authenticate('bearer', {session: false}),
//   function(req, res) {
//     res.send({message: 'hi'});
//   });
router.get('/dishes',
  function(req, res) {
    var lat = req.query.lat;
    var lon = req.query.lon;
    var user = req.user; //FIXME authenticate with passport
    //this is a callback called after getting dishes from Locu
    function handle_menu_items(err, menu_items){
      if (err){
        res.send({"success" : false})
      } else{
        //get recommended meals
        var meals = recommender.recommend(menu_items, user.tasteProfile);
        //send the recommended meals to client 
        //TODO use the response helpers
        res.send({"success" : true, "meals" : meals});
      }
    }
    //send a request to Locu for dishes
    //TODO change the value of the radius to one agreed by the team
    locuHelper.get_nearby_dishes(lon, lat, 500, user.tasteProfile.likes, handle_menu_items);
  });

router.put('/taste',
  function(req, res) {

    var taste_profile = req.user.tasteProfile;//FIXME authenticate wih passport
    /**
    Update the taste profile
    @param updates - A  structure containing the keywords to add or remove in
    a taste profile element of type type. The format is as follows:
    {
      "add": Array (list of keywords to add in taste profile),
      "remove": Array (list of keywords to remove from taste profile)
    }
    @param type - Type of taste profile element to update. 
                  One of {"likes", "dislikes", "forbidden"}
    **/
    function update_taste_profile(updates, type){
      updates.add.forEach(function(keyword){
        taste_profile[type].push(keyword);
      });

      updates.remove.forEach(function(keyword){
        var index = taste_profile[type].indexOf(keyword);
        if (index > - 1) {
          taste_profile[type].splice(index, 1);
        }
      });
    }
    
    //update the taste profile
    for(var type in req.body){
      update_taste_profile(req.body[type], type)
    }

    user.markModified("tasteProfile");
    user.save();
    res.send({"success" : true, "profile" : user.tasteProfile});
  });

router.get('/taste',
  function(req, res) {
    var user = req.user;//FIXME authenticate wih passport
    //send the taste profile to client 
    //TODO use the response helpers
    res.send({"success" : true, "profile" : user.tasteProfile});

  });

module.exports = router;