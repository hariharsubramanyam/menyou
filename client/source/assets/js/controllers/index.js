/**
 * Event handlers for the index page.
 *
 * Author: rchipman
 */

(function() {

  /**
   * Render the index template as soon as the page is ready, since
   * index is the default view.
   */
  $(document).ready(function() {
    //TODO: set up state
    //TODO: nice-looking 'loading' graphic until render
    Menyou.UI.render('index');
  });

  //TODO: move this somewhere more appropriate
  google.maps.event.addDomListener(window, 'load', Menyou.Map.initialize);

})();
