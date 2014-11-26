/**
 * Lead Author: Harihar
 *
 * Route for getting the mapping data.
 */
var express = require('express');
var router = express.Router();
var resHelper = require('../helpers/response-helper.js');

/**
 * We'll load the mappings into main memory so that we don't need to go to the database each time
 * a request is made. This is reasonable because the number of mappings is (and always will be)
 * small - after all, we need to write them by hand.
 */
var mappings = null;

/**
 * Get a list of mappings.
 *
 * Request: 
 * GET /api/mappings
 *
 * Response:
 *
 * On success:
 * {
 *  "success": true,
 *  "message": "Mappings",
 *  "content": [
 *    {
 *      "source": String,
 *      "targets": [String]
 *    },
 *    ...
 *   ]
 * }
 *
 * On error, the "success" field will be false.
 */
router.get("/", function(req, res) {
  // If the mappings are in main memory, return them.
  // Otherwise, fetch them from the database.
  if (mappings !== null) {
    resHelper.success(res, "Mappings", mappings);
  } else {
    // Note there is no harm in getting all the mappings, because we (menyou team) are the ones
    // who create them, so we know exactly how many there are. Furthermore, the number of mappings
    // will be small, so there is no risk in searching for them all and returning them to the user.
    req.model.Mapping.find({}, function(err, mapping_objects) {
      // Remove extraneous fields like the version number and id
      mappings = [];
      mapping_objects.forEach(function(mapping_object) {
        mappings.push({
          "source": mapping_object.source,
          "targets": mapping_object.targets
        });
      });

      if (err) {
        resHelper.error(res, err);
      } else {
        resHelper.success(res, "Mappings", mappings);
      } // else
    }); // find
  } // else
}); // router get

module.exports = router;
