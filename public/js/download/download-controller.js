'use strict';

angular.module('rubytorrent')
  .controller('DownloadController', ['$scope', '$modal', 'resolvedDownload', 'Download',
    function ($scope, $modal, resolvedDownload, Download) {

      $scope.downloads = resolvedDownload;
      $scope.selectedCompletes = [0, 1];
      $scope.selectedActives = [0, 1];
      $scope.filterAll = "active";
      $scope.filterDownloading = "";
      $scope.filterCompleted = "";
      $scope.filterActive = "";
      $scope.filterInactive = "";
      $scope.filterError = "";

      $scope.filterByCompleted = function(download) {
        return ($scope.selectedCompletes.indexOf(download.complete) !== -1 &&
         $scope.selectedActives.indexOf(download.state) !== -1);
      };

      $scope.changeCompleted = function() {
        $scope.selectedCompletes = [1];
        $scope.selectedActives = [0, 1];
        $scope.filterAll = "";
        $scope.filterDownloading = "";
        $scope.filterCompleted = "active";
        $scope.filterActive = "";
        $scope.filterInactive = "";
        $scope.filterError = "";
      };

      $scope.changeDownloading = function() {
        $scope.selectedCompletes = [0];
        $scope.selectedActives = [0, 1];
        $scope.filterAll = "";
        $scope.filterDownloading = "active";
        $scope.filterCompleted = "";
        $scope.filterActive = "";
        $scope.filterInactive = "";
        $scope.filterError = "";
      };

      $scope.changeAll = function() {
        $scope.selectedCompletes = [0, 1];
        $scope.selectedActives = [0, 1];
        $scope.filterAll = "active";
        $scope.filterDownloading = "";
        $scope.filterCompleted = "";
        $scope.filterActive = "";
        $scope.filterInactive = "";
        $scope.filterError = "";
      }

      $scope.changeError = function() {
        $scope.selectedCompletes = [0, 1];
        $scope.selectedActives = [0, 1];
        $scope.filterAll = "";
        $scope.filterDownloading = "";
        $scope.filterCompleted = "";
        $scope.filterActive = "";
        $scope.filterInactive = "";
        $scope.filterError = "active";
      }

      $scope.changeActive = function() {
        $scope.selectedCompletes = [0, 1];
        $scope.selectedActives = [1];
        $scope.filterAll = "";
        $scope.filterDownloading = "";
        $scope.filterCompleted = "";
        $scope.filterActive = "active";
        $scope.filterInactive = "";
        $scope.filterError = "";
      }

      $scope.changeInactive = function() {
        $scope.selectedCompletes = [0, 1];
        $scope.selectedActives = [0];
        $scope.filterAll = "";
        $scope.filterDownloading = "";
        $scope.filterCompleted = "";
        $scope.filterActive = "";
        $scope.filterInactive = "active";
        $scope.filterError = "";
      }

      $scope.create = function () {
        $scope.clear();
        $scope.open();
      };

      $scope.update = function (id) {
        $scope.download = Download.get({id: id});
        $scope.open(id);
      };

      $scope.delete = function (id) {
        Download.delete({id: id},
          function () {
            $scope.downloads = Download.query();
          });
      };

      $scope.save = function (id) {
        if (id) {
          Download.update({id: id}, $scope.download,
            function () {
              $scope.downloads = Download.query();
              $scope.clear();
            });
        } else {
          Download.save($scope.download,
            function () {
              $scope.downloads = Download.query();
              $scope.clear();
            });
        }
      };

      $scope.clear = function () {
        $scope.download = {
          
          "name": "",
          
          "path": "",
          
          "id": ""
        };
      };

      $scope.open = function (id) {
        var downloadSave = $modal.open({
          templateUrl: 'download-save.html',
          controller: DownloadSaveController,
          resolve: {
            download: function () {
              return $scope.download;
            }
          }
        });

        downloadSave.result.then(function (entity) {
          $scope.download = entity;
          $scope.save(id);
        });
      };
    }]);

var DownloadSaveController =
  function ($scope, $modalInstance, download) {
    $scope.download = download;

    

    $scope.ok = function () {
      $modalInstance.close($scope.download);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  };
