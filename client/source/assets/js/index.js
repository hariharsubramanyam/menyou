$(document).ready(function() {
    console.log('meow');
    loadPage('index');
});

loadPage = function(template, data) {
  data = data || {};
  console.log(Handlebars.templates['index']);
  $('#main-container').html(Handlebars.templates[template](data));
};

