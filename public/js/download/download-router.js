'use strict';

angular.module('rubytorrent')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/downloads', {
        templateUrl: 'views/download/downloads.html',
        controller: 'DownloadController'
      })
    }]);
