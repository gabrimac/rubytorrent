// Declare app level module which depends on filters, and services
angular.module('rubytorrent', [
  'ngResource',
  'ngRoute',
  'ui.bootstrap',
  'ui.date',
  'truncate',
  'angularFileUpload',
  'snap'
  ])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home/home.html',
        controller: 'HomeController'
      })
      .otherwise({redirectTo: '/'});
  }]);
  .directive('ngRightClick', function($parse) {
      return function(scope, element, attrs) {
          var fn = $parse(attrs.ngRightClick);
          element.bind('contextmenu', function(event) {
              scope.$apply(function() {
                  event.preventDefault();
                  fn(scope, {$event:event});
              });
          });
      };
  });
