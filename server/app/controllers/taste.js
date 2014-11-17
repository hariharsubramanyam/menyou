/**
 * Lead Author: Tawanda
 *
 * Routes for updating and retrieving the taste profile.
 */
var express = require('express');
var router = express.Router();
var passport = require('../config/passport');
var resHelper = require('../helpers/response-helper.js');
var User = require("./../models/user");

/**
 * Get the taste profile of the user
 *
 * Request:
 * GET /api/taste
 *
 * Headers:
 * Content-Type: application/json
 * Authorization: Bearer <token>
 *
 * Response:
 * On success
 * {
 *  "success": true,
 *  "message": "Got taste profile",
 *  "content": {
 *    "likes": [String],
 *    "dislikes": [String],
 *    "forbidden": [String]
 *   }
 * }
 *
 *
 * On invalid token, return 401 Unauthorized error.
 */
router.get('/',
  passport.authenticate('bearer', {session: false}),
  function(req, res) {
    resHelper.success(res, "Got taste profile", req.user.tasteProfile);
  });

/**
 * Update the taste profile of the user.
 * 
 * Request:
 * PUT /api/taste
 *
 * Headers:
 * Content-Type: application/json
 * Authorization: Bearer <token>
 *
 * Body:
 * {
 *  “likes”: {
 *    “add”: [“keyword”,...],
 *    “remove”: [“keyword”,...],
 *  },
 *  “dislikes”: {
 *    “add”: [“keyword”,...],
 *    “remove”: [“keyword”,...],
 *  },
 *  “forbidden”: {
 *    “add”: [“keyword”,...],
 *    “remove”: [“keyword”,...],
 *  },
 * }
 *
 * Response:
 * On success:
 * {
 *  "success": true,
 *  "message": "Updated taste profile",
 *  "content": {
 *  "likes": [String],
 *  "dislikes": [String],
 *  "forbidden": [String]
 *  }
 * }
 *
 * On invalid token, return 401 Unauthorized error.
 *
 */
router.put('/',
  passport.authenticate('bearer', {session: false}),
  function(req, res) {

    var user = req.user;
    var taste_profile = req.user.tasteProfile;
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
        var index = taste_profile[type].indexOf(keyword);
        if (index == -1) {
          taste_profile[type].push(keyword);
        }
      });

      updates.remove.forEach(function(keyword){
        var index = taste_profile[type].indexOf(keyword);
        if (index > -1) {
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
    resHelper.success(res, "Updated taste profile", user.tasteProfile);
  });

module.exports = router;
