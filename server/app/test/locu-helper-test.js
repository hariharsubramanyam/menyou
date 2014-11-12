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
      }); // it
    }) // describe

  }); // Locu Helper


});
