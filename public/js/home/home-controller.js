angular.module('rubytorrent')
  .controller('HomeController', ['$scope', 'resolvedTracker', 'Tracker',
   function ($scope, resolvedTracker, Tracker) {

    $scope.trackers = resolvedTracker;


  }]);
