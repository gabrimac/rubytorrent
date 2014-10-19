// Declare app level module which depends on filters, and services
angular.module('rubytorrent', ['ngResource', 'ngRoute', 'ui.bootstrap', 'ui.date', 'truncate'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home/home.html', 
        controller: 'HomeController',
        resolve:{
          resolvedTracker: ['Tracker', function (Tracker) {
            return Tracker.query();
          }]
        }
      })
      .otherwise({redirectTo: '/'});
  }]);
