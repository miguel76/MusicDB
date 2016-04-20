'use strict';

angular.module('MusicDB')
  .controller('ArtistController', ['$log', '$routeParams', 'Artist', 'ArtistRepository', function($log, $routeParams, Artist, ArtistRepository) {
    var self = this;

    self.artist = null;

    self.updateArtist = function(name, pastMembers, currentMembers) {
      ArtistRepository
        .deleteArtist(id)
        .then(_getArtist)
        .catch($log.error);
    }

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
