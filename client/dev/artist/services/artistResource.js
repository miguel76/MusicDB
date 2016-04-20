'use strict';

angular.module('MusicDB')
  .factory('ArtistResource', ['$resource', function($resource) {
    return $resource('/api/artists/:name', {name: '@name'}, {});
  }]);
