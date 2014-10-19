'use strict';

angular.module('rubytorrent')
  .controller('TorrentController', ['$scope', '$modal', 'resolvedTorrent', 'Torrent',
    function ($scope, $modal, resolvedTorrent, Torrent) {

      $scope.torrents = resolvedTorrent;

      $scope.create = function () {
        $scope.clear();
        $scope.open();
      };

      $scope.update = function (id) {
        $scope.torrent = Torrent.get({id: id});
        $scope.open(id);
      };

      $scope.delete = function (id) {
        Torrent.delete({id: id},
          function () {
            $scope.torrents = Torrent.query();
          });
      };

      $scope.save = function (id) {
        if (id) {
          Torrent.update({id: id}, $scope.torrent,
            function () {
              $scope.torrents = Torrent.query();
              $scope.clear();
            });
        } else {
          Torrent.save($scope.torrent,
            function () {
              $scope.torrents = Torrent.query();
              $scope.clear();
            });
        }
      };

      $scope.clear = function () {
        $scope.torrent = {
          
          "name": "",
          
          "path": "",
          
          "id": ""
        };
      };

      $scope.open = function (id) {
        var torrentSave = $modal.open({
          templateUrl: 'torrent-save.html',
          controller: TorrentSaveController,
          resolve: {
            torrent: function () {
              return $scope.torrent;
            }
          }
        });

        torrentSave.result.then(function (entity) {
          $scope.torrent = entity;
          $scope.save(id);
        });
      };
    }]);

var TorrentSaveController =
  function ($scope, $modalInstance, torrent) {
    $scope.torrent = torrent;

    

    $scope.ok = function () {
      $modalInstance.close($scope.torrent);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  };
