/**
 * Given a properly formatted menu object returned from the Locu API
 * (see https://dev.locu.com/documentation/#menu), extract the menu items.
 *
 * @param menu - A menu object returned from the Locu API.
 * @returns An array of menu items, formatted as:
 * [
 *  {
 *    "name": String (the name of the dish),
 *    "description": String (the description of the dish),
 *    "price": Number (the price of the dish in USD)
 *  },
 *  ...
 * ]
 */
extract_menu_items = function(menu) {
  var menu_items = [];

  // Iterate through the sections.
  menu.sections.forEach(function(section) {
    
    // Iterate through the subsections.
    section.subsections.forEach(function(subsection) {

      // Iterate through the subsection contents.
      subsection.contents.forEach(function(subsection_content) {

        // If this is is a menu item, add it to the array.
        if (subsection_content.type === "ITEM") {
          var item = subsection_content;
          menu_items.push({
            "name": item.name,
            "description": item.description,
            "price": item.price
          });
        }

      }); // subsection contents.
    }); // subsections.
  }); // sections.

  return menu_items;
}

module.exports.extract_menu_items = extract_menu_items;
