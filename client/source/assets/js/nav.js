(function() {

  $(document).ready(function() {
    Menyou.UI.render('index');
  });

  $(document).on('click', '#logo', function(evt) {
    Menyou.UI.render('index');
    Menyou.Map.initialize();
  });

  $(document).on('click', '#logout', function(evt) {
    //TODO implement logout
    console.log("would be logging out if that was implemented");
  });

})();
