'use strict';

angular.module('MusicDB')
  .factory('ArtistRepository', ['$q', 'Artist', 'ArtistResource', function($q, Artist, ArtistResource) {

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

    function create(artist) {
      if (!angular.isObject(artist) || !(artist instanceof Artist) || !artist.isValid()) {
        return $q.reject(new TypeError('Invalid artist to be created.'));
      }

      var _onSuccess = function(artist) {
        return new Artist(artist);
      };

      var _onError = function(error) {
        return $q.reject(error);
      };

      return ArtistResource
        .save(artist)
        .$promise
        .then(_onSuccess)
        .catch(_onError);
    }

    function remove(id) {
      if (!angular.isString(id)) {
        return $q.reject(new TypeError('Invalid id for deletion.'));
      }

      var _onSuccess = function() {
        return;
      }

      var _onError = function(error) {
        return $q.reject(error);
      }

      return ArtistResource
        .delete({id: id})
        .$promise
        .then(_onSuccess)
        .catch(_onError)
    }

    return {
      getByName: getByName,
      create: create,
      remove: remove
    };
  }]);

