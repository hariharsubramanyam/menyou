(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['index'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<!-- Google Maps -->\n<input id=\"pac-input\" class=\"controls\" type=\"text\" placeholder=\"Location\">\n<div id=\"map-canvas\"></div>\n\n<!-- Dish Recommendations-->\n<div id=\"menu-container\">\n  <div id=\"recommendation-container\">\n    <div id=\"recommendation-title\">Meals for you in Boston, MA...</div>\n\n    <div class=\"meal\">\n      <p>Pad Thai @ Pepper's Sky <span class=\"price\">$10.95</span></p>\n      <p class=\"description\">Rice noodles wok fried with egg, chicken, shrimp, crushed peanuts, bean sprouts, lime juice, fish sauce and tamarind juice. This is the ultimate street stall food.</p>\n    </div>\n\n    <hr>\n\n    <div class=\"meal\">\n      <p>Mango Salad with Cashews @ Pepper's Sky <span class=\"price\">$10.95</span></p>\n      <p class=\"description\">Tangy shredded green mango salad tossed in spicy lime juice, onion, herbs and cashews. Hot and spicy.</p>\n    </div>\n\n    <hr>\n\n    <div class=\"meal\">\n      <p>Beef Salad Grilled Beef @ Pepper's Sky <span class=\"price\">$11.95</span></p>\n      <p class=\"description\">Sliced charcoal grilled beef tenderloin in spicy lime juice, pepper, mushrooms, cucumber, tomato, herbs and mint leaves. Hot and spicy.</p>\n    </div>\n\n    <hr>\n\n    <div class=\"meal\">\n      <p>Pad Thai @ Pepper's Sky <span class=\"price\">$10.95</span></p>\n      <p class=\"description\">Rice noodles wok fried with egg, chicken, shrimp, crushed peanuts, bean sprouts, lime juice, fish sauce and tamarind juice. This is the ultimate street stall food.</p>\n    </div>\n\n    <hr>\n\n    <div class=\"meal\">\n      <p>Pad Thai <i>@ Pepper's Sky <span class=\"price\">$10.95</span></i></p>\n      <p class=\"description\">Rice noodles wok fried with egg, chicken, shrimp, crushed peanuts, bean sprouts, lime juice, fish sauce and tamarind juice. This is the ultimate street stall food.</p>\n    </div>\n\n    <hr>\n\n    <div class=\"meal\">\n      <p>Pad Thai @ Pepper's Sky <span class=\"price\">$10.95</span></p>\n      <p class=\"description\">Rice noodles wok fried with egg, chicken, shrimp, crushed peanuts, bean sprouts, lime juice, fish sauce and tamarind juice. This is the ultimate street stall food.</p>\n    </div>\n\n    <hr>\n\n    <div class=\"meal\">\n      <p>Pad Thai @ Pepper's Sky <span class=\"price\">$10.95</span></p>\n      <p class=\"description\">Rice noodles wok fried with egg, chicken, shrimp, crushed peanuts, bean sprouts, lime juice, fish sauce and tamarind juice. This is the ultimate street stall food.</p>\n    </div>\n\n  </div>\n</div>";
  },"useData":true});
templates['profile'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"profile-container\">\n  <div id=\"username\">\n    Ben Bitdiddle\n  </div>\n  <div id=\"likes-container\">\n    <h3 class=\"section-title\">Likes</h3>\n    <hr>\n    <input id=\"likes-input\" type=\"text\">\n    <button>Add</button>\n  </div>\n  <div id=\"dislikes-container\">\n    <h3 class=\"section-title\">Dislikes</h3>\n    <hr>\n    <input id=\"dislikes-input\" type=\"text\">\n    <button>Add</button>\n  </div>\n  <div id=\"restrictions-container\">\n    <h3 class=\"section-title\">Dietary Restrictions</h3>\n    <hr>\n\n    <table id=\"allergies\">\n      <tr>\n        <th>Y/N</th>\n        <th>Allergies:</th>\n      </tr>\n      <tr>\n        <td><input type=checkbox></td>\n        <td>Egg</td>\n      </tr>\n      <tr>\n        <td><input type=checkbox></td>\n        <td>Fish</td>\n      </tr>\n      <tr>\n        <td><input type=checkbox></td>\n        <td>Milk</td>\n      </tr>\n      <tr>\n        <td><input type=checkbox></td>\n        <td>Peanut</td>\n      </tr>\n      <tr>\n        <td><input type=checkbox></td>\n        <td>Tree Nut</td>\n      </tr>\n      <tr>\n        <td><input type=checkbox></td>\n        <td>Shellfish</td>\n      </tr>\n      <tr>\n        <td><input type=checkbox></td>\n        <td>Soy</td>\n      </tr>\n      <tr>\n        <td><input type=checkbox></td>\n        <td>Wheat</td>\n      </tr>\n    </table>\n\n  </div>\n</div>";
  },"useData":true});
})();