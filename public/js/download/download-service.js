'use strict';

angular.module('rubytorrent')
  .factory('Download', ['$resource', function ($resource) {
    var download = $resource('rubytorrent/downloads/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });

    download.prototype.getState = function() {
      if ( this.state === 0) {
        return 'Finalized';
      } else if (this.complete === 1 && this.state === 1) {
        return 'Sharing';
      } else if (this.complete === 0 && this.state === 1) {
        return 'Downloading';
      }
    };

    download.prototype.getSize = function() {
      return calculateSize(this.size_bytes);
    };

    download.prototype.getPercentage = function() {
      return ((this.completed_bytes / this.size_bytes) * 100).toFixed() + " %";
    };

    download.prototype.getDown = function() {
      return calculateSize(this.down_total);
    };

    download.prototype.getUp = function() {
      return calculateSize(this.up_total);
    };

    download.prototype.getRatio = function() {
      return this.ratio / 1000;
    };

    download.prototype.getDownRate = function() {
      if (this.down_rate === 0) {
        return "";
      } else {
        return (this.down_rate / 1024).toFixed(2).toString() + " KB";
      }  
    };

    download.prototype.getUpRate = function() {
      if (this.up_rate === 0) {
        return "";
      } else {
        return (this.up_rate / 1024).toFixed(2).toString() + " KB";
      }  
    };

    function calculateSize(value) {
      return (value / (1024 * 1024 * 1024)).toFixed(2).toString()
       + " GB";
    };

    return download;
  }]);
