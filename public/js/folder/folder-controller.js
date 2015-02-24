'use strict';

angular.module('rubytorrent')
  .controller('FolderController', ['$scope', '$modal', 'resolvedFolder', 'Folder',
    function ($scope, $modal, resolvedFolder, Folder) {

      $scope.folders = resolvedFolder;

      $scope.create = function () {
        $scope.clear();
        $scope.open();
      };

      $scope.update = function (id) {
        $scope.folder = Folder.get({id: id});
        $scope.open(id);
      };

      $scope.delete = function (id) {
        Folder.delete({id: id},
          function () {
            $scope.folders = Folder.query();
          });
      };

      $scope.save = function (id) {
        if (id) {
          Folder.update({id: id}, $scope.folder,
            function () {
              $scope.folders = Folder.query();
              $scope.clear();
            });
        } else {
          Folder.save($scope.folder,
            function () {
              $scope.folders = Folder.query();
              $scope.clear();
            });
        }
      };

      $scope.clear = function () {
        $scope.folder = {
          
          "path": "",
          
          "user_id": "",
          
          "id": ""
        };
      };

      $scope.open = function (id) {
        var FolderSave = $modal.open({
          templateUrl: 'folder-save.html',
          controller: 'FolderSaveController',
          resolve: {
            Folder: function () {
              return $scope.folder;
            }
          }
        });

        FolderSave.result.then(function (entity) {
          $scope.folder = entity;
          $scope.save(id);
        });
      };
    }])
  .controller('FolderSaveController', ['$scope', '$modalInstance', 'Folder',
    function ($scope, $modalInstance, Folder) {
      $scope.folder = Folder;

      

      $scope.ok = function () {
        $modalInstance.close($scope.folder);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);
