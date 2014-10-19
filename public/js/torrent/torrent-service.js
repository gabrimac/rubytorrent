'use strict';

angular.module('rubytorrent')
  .factory('Torrent', ['$resource', function ($resource) {
    return $resource('rubytorrent/torrents/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);
