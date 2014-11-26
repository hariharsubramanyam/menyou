/**
 * Lead Author: Harihar
 *
 * The model for a Mapping (i.e. associating a source keyword with a set of target keywords).
 */
var mongoose = require("mongoose");

var mappingSchema = mongoose.Schema({
  source: { 
    type: String, 
    unique: true,
    index: true, 
    required: "A mapping must have a source",
    dropDups: true
  },
  targets: [String]
});

var Mapping = mongoose.model("Mapping", mappingSchema);

module.exports = Mapping;
