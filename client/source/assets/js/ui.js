
(function() {

  Menyou.UI = {};

  Menyou.UI.render = function(template, context) {
    var data = context || {};
    $('body').html(Menyou.templates[template](data));
  };

})();
