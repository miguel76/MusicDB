'use strict';

angular.module('MusicDB')
  .factory('Artist', [function() {
    var Artist = function(artist) {
      this.name = null;
      this.currentMembers = [];
      this.pastMembers = [];
      this.currentBands = [];
      this.pastBands = [];
      this.relatedArtists = [];

      angular.extend(this, artist);
    };

    var MIN_ACCEPTED_LENGTH = 5;

    Artist.prototype.isValid = function() {
      var _isDefined = angular.isDefined(this.name);
      var _isString = angular.isString(this.name);
      var _isBigEnough = (_isDefined && _isString) ? this.name.length >= MIN_ACCEPTED_LENGTH : false;

      return _isDefined && _isString && _isBigEnough;
    };

    return Artist;
  }]);


