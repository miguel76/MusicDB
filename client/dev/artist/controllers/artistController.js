'use strict';

angular.module('MusicDB')
  .controller('ArtistController', ['$log', '$routeParams', 'Artist', 'ArtistRepository', function($log, $routeParams, Artist, ArtistRepository) {
    var self = this;

    self.artist = null;

    self.addToBand = function(band, member) {
      ArtistRepository
        .addToBand(band, member)
        .then(_getArtist)
        .catch($log.error);
    };

    self.removeFromBand = function(band, member) {
      ArtistRepository
        .removeFromBand(band, member)
        .then(_getArtist)
        .catch($log.error);
    };

    var _getArtist = function(name) {
      var _onSuccess = function(artist) {
        return self.artist = artist;
      };

      return ArtistRepository
        .getByName(name)
        .then(_onSuccess)
        .catch($log.error);
    }

    _getArtist($routeParams.name);
  }]);
