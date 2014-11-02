
// declare the module for the home controller
var homeController = angular.module('homeController', []);

/**
 * This function is a controller, which is essentially in
 * charge of augmenting the scope for the area to which it
 * is applied
 */
var MainController = function($scope, $http, Home) {

  // get all the meals
  Home.get()
    .success(function(data) {
      $scope.meals = data;
    });

};

// register the controller
homeController.controller('MainController', ['$scope', '$http', 'Home', MainController])
