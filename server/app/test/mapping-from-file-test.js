/**
 * Lead Author: Harihar
 *
 * Test module for reading Mapping from files and importing them to database.
 */

var mappings_from_file = require("../helpers/mappings-from-file");
var expect = require("chai").expect;
var fs = require("fs");
var mongoose = require("mongoose");
var Mapping = require("../models/mapping");
var secrets = require("../config/secrets");

describe("Mappings from file", function() {
  describe("#import_mappings", function() {
    it("should import mappings from file", function(done) {

      // Some sample mapping data.
      var mapping_data = ["shellfish, oyster, clam, lobster, crab, mussel", 
      "dairy, milk, cheese, yogurt",
      "nuts, peanuts, hazelnuts, brazil nuts"];

      // Write the mapping data to a file.
      var file_path = "./mapping_data.csv";
      fs.writeFileSync(file_path, mapping_data.join("\n"));

      // Helper function for verifying that a mapping has been added to the database. 
      var num_verified = 0;
      var verify_mapping = function() {
        if (num_verified === mapping_data.length) {
          // Disconnect DB and finish
          mongoose.disconnect();
          done();
        } else {
          // Tokenize the mapping.
          var tokens = mapping_data[num_verified].split(",");
          for (var i = 0; i < tokens.length; i++) {
            tokens[i] = tokens[i].trim();
          }
          // Search for the source. 
          Mapping.findOne({"source": tokens[0]}, function(err, mapping) {
            expect(err).to.be.null;
            expect(mapping.targets.length).to.eql(tokens.length - 1);
            num_verified += 1;
            verify_mapping();
          });
        }
      };
      // Create test database.
      var connection = mongoose.connect(secrets.MONGO_TEST_URL).connection;
      connection.on("connected", function() {
        mappings_from_file.import_mappings(file_path, Mapping, function() {
          // Delete the mapping file.
          fs.unlinkSync(file_path);
          verify_mapping();
        });
      }); 
    });

  });
});
