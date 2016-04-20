'use strict';

import Artist from '../model/artist';
import * as Promise from 'bluebird';

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

export default class ArtistSparqlRepository {
  static getByName(name: string): Promise<Artist> {
    var client = Promise.promisifyAll(new SparqlClient(endpoint));
    var artist: Artist = new Artist();

    artist.name = name;
    var currentBandsPromise =  client
      .query(currentBandsQuery)
      .bind('ArtistName', "\"" + name + "\"@en")
      .executeAsync()
      .then(results => {
        for (var band of results.results.bindings) {
          if (!artist.currentBands) {
            artist.currentBands = [];
          }
          artist.currentBands.push(band.Name.value);
        }
        return artist;
      });

    var pastBandsPromise =  client
      .query(pastBandsQuery)
      .bind('ArtistName', "\"" + name + "\"@en")
      .executeAsync()
      .then(results => {
        for (var band of results.results.bindings) {
          if (!artist.pastBands) {
            artist.pastBands = [];
          }
          artist.pastBands.push(band.Name.value);
        }
        return artist;
      });

    var currentMembersPromise =  client
      .query(currentMembersQuery)
      .bind('ArtistName', "\"" + name + "\"@en")
      .executeAsync()
      .then(results => {
        for (var band of results.results.bindings) {
          if (!artist.currentMembers) {
            artist.currentMembers = [];
          }
          artist.currentMembers.push(band.Name.value);
        }
        return artist;
      });

    var pastMembersPromise =  client
      .query(pastMembersQuery)
      .bind('ArtistName', "\"" + name + "\"@en")
      .executeAsync()
      .then(results => {
        for (var band of results.results.bindings) {
          if (!artist.pastMembers) {
            artist.pastMembers = [];
          }
          artist.pastMembers.push(band.Name.value);
        }
        return artist;
      });

    return Promise.all([currentBandsPromise, pastBandsPromise, currentMembersPromise, pastMembersPromise]).then(() => {
      return artist;
    });
  }
}
