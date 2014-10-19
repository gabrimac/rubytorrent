'use strict';

angular.module('rubytorrent')
  .factory('File', ['$resource', function ($resource) {
    return $resource('rubytorrent/files/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);
