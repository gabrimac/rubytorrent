'use strict';

angular.module('rubytorrent')
  .controller('FileController', ['$scope', '$modal', 'resolvedFile', 'File',
    function ($scope, $modal, resolvedFile, File) {

      $scope.files = resolvedFile;

      $scope.create = function () {
        $scope.clear();
        $scope.open();
      };

      $scope.update = function (id) {
        $scope.file = File.get({id: id});
        $scope.open(id);
      };

      $scope.delete = function (id) {
        File.delete({id: id},
          function () {
            $scope.files = File.query();
          });
      };

      $scope.save = function (id) {
        if (id) {
          File.update({id: id}, $scope.file,
            function () {
              $scope.files = File.query();
              $scope.clear();
            });
        } else {
          File.save($scope.file,
            function () {
              $scope.files = File.query();
              $scope.clear();
            });
        }
      };

      $scope.clear = function () {
        $scope.file = {
          
          "name": "",
          
          "path": "",
          
          "size": "",
          
          "id": ""
        };
      };

      $scope.open = function (id) {
        var fileSave = $modal.open({
          templateUrl: 'file-save.html',
          controller: FileSaveController,
          resolve: {
            file: function () {
              return $scope.file;
            }
          }
        });

        fileSave.result.then(function (entity) {
          $scope.file = entity;
          $scope.save(id);
        });
      };
    }]);

var FileSaveController =
  function ($scope, $modalInstance, file) {
    $scope.file = file;

    

    $scope.ok = function () {
      $modalInstance.close($scope.file);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  };
