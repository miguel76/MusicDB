'use strict';

angular.module('MusicDB')

  .factory('BandMemberResource', function($resource) {
    return $resource('/api/artists/:band/:member', {band: '@band', member: "@member"}, {});
  })

  .factory('ArtistResource', function($resource) {
    return $resource('/api/artists/:name', {name: '@name'}, {});
  });
