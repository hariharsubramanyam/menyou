(function() {

  Menyou.UI.animateLoading = function() {
    $('body').prepend($('<div>', { id: 'svg-container' }));
    $('#svg-container').append($('<div>', { id: 'loading-container' }));
    $('#svg-container').append($('<div>', { id: 'shade-container' }));
    $('#shade-container').load('assets/img/shade.svg');
    $('#loading-container').load('assets/img/loading.svg', function() {
      new Vivus('loading-svg', {
        type: 'scenario-sync',
        duration: 50
      }, function() {

      });
    });

  };

})();
