/**
 * Lead Author: Harihar
 *
 * Route for getting the mapping data.
 */
var express = require('express');
var router = express.Router();
var resHelper = require('../helpers/response-helper.js');

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
  // Note there is no harm in getting all the mappings, because we (menyou team) are the ones
  // who create them, so we know exactly how many there are. Furthermore, the number of mappings
  // will be small, so there is no risk in searching for them all and returning them to the user.
  req.model.Mapping.find({}, function(err, mapping_objects) {
    // Remove extraneous fields like the version number and id
    var mappings = [];
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
    }
  });
});

module.exports = router;
