Menyou = Menyou || {};
Menyou.UI = {};

$(document).ready(function() {
    loadPage('index');
});

$(document).on('click', '#logo', function(evt) {
  loadPage('index');
});

$(document).on('click', '#profile', function(evt) {
  loadPage('profile');
});

$(document).on('click', '#logout', function(evt) {
  console.log("would be logging out if that was implemented");
});

Menyou.UI.loadPage = function(template, data) {
  data = data || {};
  $('#main-container').html(menyou.templates[template](data));
};

google.maps.event.addDomListener(window, 'load', Menyou.Map.initialize);
