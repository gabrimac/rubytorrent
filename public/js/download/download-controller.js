'use strict';

angular.module('rubytorrent')
  .controller('DownloadController', ['$scope', '$modal', '$upload', '$interval', 'Download',
    function ($scope, $modal,  $upload, $interval, Download) {

      getDownloads();
      $interval(function() {
        getDownloads();
      }, 30000);
      //$interval(get_actives(), 10000);
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
          $scope.downloads = Download.query();
          //$scope.save(id);
        });
      };

      function getDownloads() {
        Download.query().$promise.then(function(downloads) {
          $scope.downloads = downloads;
        });
      }

      // function get_actives() {
      //   angular.forEach($scope.downloads, function(download){
      //     if (download.down_total > 0 || download.up_total > 0) {
      //       var id = "";
      //       download = Download.get(id = download.local_id);
      //     }
      //   });
      // };

    }]);

var DownloadSaveController =
  function ($scope, $modalInstance, $upload, download) {
    $scope.download = download;

    $scope.onFileSelect = function($files) {
        //$files: an array of files selected, each file has name, size, and type.
      for (var i = 0; i < $files.length; i++) {
        var file = $files[i];
        $scope.upload = $upload.upload({
          url: 'rubytorrent/uploads', //upload.php script, node.js route, or servlet url
          //method: 'POST' or 'PUT',
          //headers: {'header-key': 'header-value'},
          //withCredentials: true,
          data: {myObj: $scope.myModelObj},
          file: file, // or list of files ($files) for html5 only
          //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
          // customize file formData name ('Content-Disposition'), server side file variable name.
          //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file'
          // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
          //formDataAppender: function(formData, key, val){}
        }).progress(function(evt) {
          console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        }).success(function(data, status, headers, config) {
          // file is uploaded successfully
          console.log(data);
          $modalInstance.close($scope.download);
        }).error(function(data, status, headers,config) {
          console.log(data);
          $modalInstance.close($scope.download);
        });
        //.error(...)
        //.then(success, error, progress);
        // access or attach event listeners to the underlying XMLHttpRequest.
        //.xhr(function(xhr){xhr.upload.addEventListener(...)})
      }
      /* alternative way of uploading, send the file binary with the file's content-type.
         Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed.
         It could also be used to monitor the progress of a normal http post/put request with large data*/
      // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
    };

    $scope.ok = function () {
      $modalInstance.close($scope.download);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  };
