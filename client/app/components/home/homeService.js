
// declare the module for the home service
var homeService = angular.module('homeService', []);

/**
 * This function provides the appropriate API calls for
 * the home service. The parameter is the http dependency
 */
var HomeAPICaller = function($http) {
  return {
    get: function() {
      return $http.get('/api/meals');
    },
    login: function(username, password) {
      var authData = {};
      return $http.post('/api/login', authData);
    }
  }
};

// register the service with the module
homeService.service('Home', ['$http', HomeAPICaller]);
