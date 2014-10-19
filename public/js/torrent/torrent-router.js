'use strict';

angular.module('rubytorrent')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/torrents', {
        templateUrl: 'views/torrent/torrents.html',
        controller: 'TorrentController',
        resolve:{
          resolvedTorrent: ['Torrent', function (Torrent) {
            return Torrent.query();
          }]
        }
      })
    }]);
