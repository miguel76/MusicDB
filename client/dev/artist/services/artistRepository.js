'use strict';

angular.module('MusicDB')
  .factory('ArtistRepository', function($q, Artist, ArtistResource, BandMemberResource) {

    function getByName(name) {
      var _onSuccess = function(artist) {
        // do something with the response from the server, like extending a model or something

        return artist; // this will be returned as a resolved promise
      };

      var _onError = function(error) {
        // do something with the error, like making it more readable or something

        return $q.reject(error); // this will be returned as a rejected promise
      };

      return ArtistResource
        .get({name: name})
        .$promise
        .then(_onSuccess)
        .catch(_onError);
    }

    function addToBand(band, member) {

      var _onSuccess = function() {
        return;
      };

      var _onError = function(error) {
        return $q.reject(error);
      };

      return BandMemberResource
        .save({band: band, member: member})
        .$promise
        .then(_onSuccess)
        .catch(_onError);
    }

    function removeFromBand(band, member) {

      var _onSuccess = function() {
        return;
      }

      var _onError = function(error) {
        return $q.reject(error);
      }

      return BandMemberResource
        .delete({band: band, member: member})
        .$promise
        .then(_onSuccess)
        .catch(_onError)
    }

    return {
      getByName: getByName,
      addToBand: addToBand,
      removeFromBand: removeFromBand
    };
  });

