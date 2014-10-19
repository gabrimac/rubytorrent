'use strict';

angular.module('rubytorrent')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/files', {
        templateUrl: 'views/file/files.html',
        controller: 'FileController',
        resolve:{
          resolvedFile: ['File', function (File) {
            return File.query();
          }]
        }
      })
    }]);
