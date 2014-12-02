/**
 * Lead Author: Harihar
 *
 * Test module for fetching and parsing data from Locu.
 */
// Create a sample menu.
var menu = {
  "menu_name": "Lunch",
  "sections": [
    {
      "section_name": "Salads",
      "subsections": [
        {
          "subsection_name": "Vegetable",
          "contents": [
            {"type":"SECTION_TEXT"},
            {
              "type": "ITEM",
              "name": "Garden Salad",
              "price": "11",
              "description": "A salad"
            }
          ]
        },
        {
          "subsection_name": "Fruit",
          "contents": [
            {
              "type": "ITEM",
              "name": "Fruit Salad",
              "price": "1 each",
              "description": "Fruits"
            }
          ]
        }
      ]
    },
    {
      "section_name": "Soups",
      "subsections": [
        {
          "subsection_name": "Light",
          "contents": [
            {
              "type": "ITEM",
              "name": "Soup 1",
              "price": "3",
              "description": "Soup 1"
            },
            {
              "type": "ITEM",
              "name": "Soup 2",
              "price": "1",
              "description": "Soup 2"
            },
            {
              "type": "ITEM",
              "name": "Soup 3",
              "price": "5",
              "description": "Soup 3"
            }
          ]
        },
        {
          "subsection_name": "Hearty",
          "contents": [
          ]
        }
      ]
    }
  ]
}

var locu_helper = require("../helpers/locu-helper.js");
var expect = require("chai").expect;

describe("Locu Helper", function() {
  describe("#extract_menu_items", function() {
    it("should correctly parse a menu", function() {
      var TEST_RESTAURANT = "Test Restaurant";
      var menu_items = locu_helper.extract_menu_items(menu, TEST_RESTAURANT);
      var expected_item_names = ["Soup 1", "Soup 2", "Soup 3", "Garden Salad", "Fruit Salad"];

      expect(menu_items).to.have.property("length");
      expect(menu_items.length).to.eql(5);

      menu_items.forEach(function(item) {
        expect(item).to.have.property("restaurant", TEST_RESTAURANT);
        expect(item).to.have.property("name");
        expect(item).to.have.property("description");
        expect(item).to.have.property("price");
        expect(expected_item_names).to.include(item.name);

        // Remove the name from the array so we don't have duplicates. 
        for (var i = 0; i < expected_item_names.length; i++) {
          if (expected_item_names[i] === item.name) {
            expected_item_names[i] = undefined;
          } // if
        } // loop
      }); // forEach 
    }); // it 
  }); // describe

  describe("#menu_items_for_venue", function() {
    it("extracts menu items for venue", function() {
      var venue = {
        "name": "Some place",
        "location": {
          "address1": "1 Main St",
          "locality": "Cambridge",
          "region": "MA",
          "geo": {
            "coordinates": [1, 2]
          }
        },
        "menus": [menu, menu]
      };
      var expected_item_names = ["Soup 1", "Soup 2", "Soup 3", "Garden Salad", "Fruit Salad"];

      var menu_items = locu_helper.menu_items_for_venue(venue);
      expect(menu_items).to.have.property("length");
      expect(menu_items.length).to.eql(10);

      menu_items.forEach(function(menu_item) {
        expect(menu_item).to.have.property("name");
        expect(menu_item).to.have.property("description");
        expect(menu_item).to.have.property("price");
        expect(menu_item).to.have.property("restaurant");
        var restaurant = menu_item.restaurant;
        expect(restaurant).to.have.property("name");
        expect(restaurant).to.have.property("lat");
        expect(restaurant).to.have.property("lon");
        expect(restaurant).to.have.property("address");
        expect(restaurant.name).to.eql("Some place");
        expect(restaurant.lat).to.eql(2);
        expect(restaurant.lon).to.eql(1);
        expect(restaurant.address).to.eql("1 Main St, Cambridge, MA");
        expect(expected_item_names).to.include(menu_item.name);
      }); // forEach
    }); // it
  }); // describe

  describe("#get_nearby_dishes", function() {
    it("Gets dishes near the user", function(done) {
      // This is a network request, so allow more time to run.
      this.timeout(10000);

      var LAT = 42.359003;
      var LON = -71.091853;
      var RADIUS_METERS = 2000;
      var LIKES = ["pad thai", "chicken", "pizza"];
      locu_helper.get_nearby_dishes(LON, LAT, RADIUS_METERS, LIKES, function(err, menu_items) {
        menu_items.forEach(function(menu_item) {
          expect(menu_item).to.have.property("name");
          expect(menu_item).to.have.property("description");
          expect(menu_item).to.have.property("price");
          expect(menu_item).to.have.property("restaurant");
          var restaurant = menu_item.restaurant;
          expect(restaurant).to.have.property("name");
          expect(restaurant).to.have.property("lat");
          expect(restaurant).to.have.property("lon");
          expect(restaurant).to.have.property("address");
        });
        done();
      }); // get_nearby_dishes
    }); // it
  }); // describe

}); // Locu Helper
