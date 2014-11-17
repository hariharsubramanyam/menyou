$(document).ready(function() {
    loadPage('profile');
    // loadPage('index');
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

loadPage = function(template, data) {
  data = data || {};
  $('#main-container').html(Handlebars.templates[template](data));
};