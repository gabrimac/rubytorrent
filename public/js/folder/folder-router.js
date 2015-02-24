'use strict';

angular.module('rubytorrent')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/folders', {
        templateUrl: 'views/folder/folders.html',
        controller: 'FolderController',
        resolve:{
          resolvedFolder: ['Folder', function (folder) {
            return folder.query();
          }]
        }
      })
    }]);
