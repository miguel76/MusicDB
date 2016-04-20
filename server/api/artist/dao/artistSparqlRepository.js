'use strict';
var artist_1 = require('../model/artist');
var Promise = require('bluebird');
var SparqlClient = require('sparql-client');
var endpoint = 'http://dbpedia.org/sparql';
var currentBandsQuery = "PREFIX dbp: <http://dbpedia.org/property/>\
      PREFIX dbo: <http://dbpedia.org/ontology/>\
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
      SELECT ?Name WHERE {\
        ?Artist dbp:name ?ArtistName .\
        FILTER (EXISTS {?Artist rdf:type dbo:MusicalArtist} || EXISTS {?Artist rdf:type dbo:Band})\
        ?Band dbo:bandMember ?Artist .\
        ?Band dbp:name ?Name\
      }";
var pastBandsQuery = "PREFIX dbp: <http://dbpedia.org/property/>\
      PREFIX dbo: <http://dbpedia.org/ontology/>\
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
      SELECT ?Name WHERE {\
        ?Artist dbp:name ?ArtistName .\
        FILTER (EXISTS {?Artist rdf:type dbo:MusicalArtist} || EXISTS {?Artist rdf:type dbo:Band})\
        ?Band dbo:formerBandMember ?Artist .\
        ?Band dbp:name ?Name\
      }";
var currentMembersQuery = "PREFIX dbp: <http://dbpedia.org/property/>\
      PREFIX dbo: <http://dbpedia.org/ontology/>\
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
      SELECT ?Name WHERE {\
        ?Artist dbp:name ?ArtistName .\
        FILTER (EXISTS {?Artist rdf:type dbo:MusicalArtist} || EXISTS {?Artist rdf:type dbo:Band})\
        ?Artist dbo:bandMember ?Member .\
        ?Member dbp:name ?Name\
      }";
var pastMembersQuery = "PREFIX dbp: <http://dbpedia.org/property/>\
      PREFIX dbo: <http://dbpedia.org/ontology/>\
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
      SELECT ?Name WHERE {\
        ?Artist dbp:name ?ArtistName .\
        FILTER (EXISTS {?Artist rdf:type dbo:MusicalArtist} || EXISTS {?Artist rdf:type dbo:Band})\
        ?Artist dbo:formerBandMember ?Member .\
        ?Member dbp:name ?Name\
      }";
var ArtistSparqlRepository = (function () {
    function ArtistSparqlRepository() {
    }
    ArtistSparqlRepository.getByName = function (name) {
        var client = Promise.promisifyAll(new SparqlClient(endpoint));
        var artist = new artist_1.default();
        artist.name = name;
        var currentBandsPromise = client
            .query(currentBandsQuery)
            .bind('ArtistName', "\"" + name + "\"@en")
            .executeAsync()
            .then(function (results) {
            for (var _i = 0, _a = results.results.bindings; _i < _a.length; _i++) {
                var band = _a[_i];
                if (!artist.currentBands) {
                    artist.currentBands = [];
                }
                artist.currentBands.push(band.Name.value);
            }
            return artist;
        });
        var pastBandsPromise = client
            .query(pastBandsQuery)
            .bind('ArtistName', "\"" + name + "\"@en")
            .executeAsync()
            .then(function (results) {
            for (var _i = 0, _a = results.results.bindings; _i < _a.length; _i++) {
                var band = _a[_i];
                if (!artist.pastBands) {
                    artist.pastBands = [];
                }
                artist.pastBands.push(band.Name.value);
            }
            return artist;
        });
        var currentMembersPromise = client
            .query(currentMembersQuery)
            .bind('ArtistName', "\"" + name + "\"@en")
            .executeAsync()
            .then(function (results) {
            for (var _i = 0, _a = results.results.bindings; _i < _a.length; _i++) {
                var band = _a[_i];
                if (!artist.currentMembers) {
                    artist.currentMembers = [];
                }
                artist.currentMembers.push(band.Name.value);
            }
            return artist;
        });
        var pastMembersPromise = client
            .query(pastMembersQuery)
            .bind('ArtistName', "\"" + name + "\"@en")
            .executeAsync()
            .then(function (results) {
            for (var _i = 0, _a = results.results.bindings; _i < _a.length; _i++) {
                var band = _a[_i];
                if (!artist.pastMembers) {
                    artist.pastMembers = [];
                }
                artist.pastMembers.push(band.Name.value);
            }
            return artist;
        });
        return Promise.all([currentBandsPromise, pastBandsPromise, currentMembersPromise, pastMembersPromise]).then(function () {
            return artist;
        });
    };
    return ArtistSparqlRepository;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ArtistSparqlRepository;
//# sourceMappingURL=artistSparqlRepository.js.map