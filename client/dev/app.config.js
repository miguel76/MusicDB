'use strict';

angular.module('MusicDB')
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/artists/:name', {
        templateUrl: 'artist/templates/artist.html',
        controller: 'ArtistController',
        controllerAs: 'artistCtrl'
      })
      .otherwise({redirectTo: '/'});
  }])
  .config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
  }]);
