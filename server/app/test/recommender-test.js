var menu_items = [
  {
    "name": "Yellow Curry",
    "description": "Very Spicy- Your choice is sauteed in a sweet yellow curry with curry powder" +
     ", pineapple, onion, tomato and summer squash."
  },
  {
    "name": "Massaman Curry",
    "description": "Spicy- Your choice is sauteed in a Thai-Malaysian curry sauce with sweet" +
     " potato, onion and carrot.(Contain peanut)"
  },
  {
    "name": "Bell Pepper Beef",
    "description": "Very Spicy- Slices of beef tenderloin sauteed w/ bell pepper, long horn" + 
     " pepper & mushroom in a spicy pepper sauce"
  },
  {
    "name": "Burger with onion rings",
    "description": "Fatty onion rings fried in oil"
  }
];

var taste_profile = {
  "likes": ["massaman", "thai"],
  "dislikes": ["burger", "fries", "oil", "onion rings", "fat"],
  "forbidden": ["mushroom"]
};

var recommender = require("../helpers/recommender.js");
var expect = require("chai").expect;

describe("Recommender", function() {
  describe("#recommend", function() {
    it("should recommend dishes correctly", function() {
      var restaurant = {
        "name": "Test restaurant",
        "lat": 42,
        "lon": -72,
        "address": "1 Main St, Boston, MA"
      };
      for (var i = 0; i < menu_items.length; i++) {
        menu_items[i].restaurant = restaurant;
      }
      var recommended = recommender.recommend(menu_items, taste_profile);

      // key = name of dish, value = number of points for dish with given name.
      var points_for_name = {};

      var minimum_points = 1000;
      var maximum_points = -1000
      recommended.forEach(function(menu_item) {
        expect(menu_item).to.have.property("points");
        expect(menu_item).to.have.property("name");
        points_for_name[menu_item.name] = parseInt(menu_item.points, 10);
        minimum_points = Math.min(minimum_points, points_for_name[menu_item.name]);
        maximum_points = Math.max(maximum_points, points_for_name[menu_item.name]);
      });

      // The Bell Pepper Beef should not appear because I've forbidden mushrooms.
      expect(points_for_name).to.not.have.property("Bell Pepper Beef");

      // The Burger with onion rings has the most disliked ingredients, so it should have the
      // fewest points.
      expect(points_for_name["Burger with onion rings"]).to.eql(minimum_points);

      // The Massaman Curry has the most liked ingredients, so it should have the most points.
      expect(points_for_name["Massaman Curry"]).to.eql(maximum_points);
    });
  });
});
