'use strict';

angular.module('rubytorrent')
  .factory('Folder', ['$resource', function ($resource) {
    return $resource('rubytorrent/folders/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);
