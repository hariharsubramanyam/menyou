Menyou.UI = {};

$(document).ready(function() {
  Menyou.UI.loadPage('index');
});

$(document).on('click', '#logo', function(evt) {
  Menyou.UI.loadPage('index');
  Menyou.Map.initialize();
});

$(document).on('click', '#logout', function(evt) {
  //TODO implement logout
  console.log("would be logging out if that was implemented");
});

Menyou.UI.loadPage = function(template, data) {
  data = data || {};
  $('body').prepend(Menyou.templates.app.nav(data));
  $('#main-container').html(Menyou.templates[template](data));
  //$('#main-container').append(Menyou.templates.app.footer(data));
};

google.maps.event.addDomListener(window, 'load', Menyou.Map.initialize);
