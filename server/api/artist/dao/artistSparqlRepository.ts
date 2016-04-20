'use strict';

import Artist from '../model/artist';
import * as Promise from 'bluebird';
import * as _ from 'lodash'

var SparqlClient = require('sparql-client');

var endpoint = 'http://dbpedia.org/sparql';

//var endpoint = 'http://localhost:8080/openrdf-sesame/repositories/test';

var bandMemberQuery = "PREFIX dbp: <http://dbpedia.org/property/>\
      PREFIX dbo: <http://dbpedia.org/ontology/>\
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
      SELECT DISTINCT ?BandName ?FormerBandName ?MemberName ?FormerMemberName WHERE {\
        ?Artist dbp:name ?ArtistName .\
        FILTER (EXISTS {?Artist rdf:type dbo:MusicalArtist} || EXISTS {?Artist rdf:type dbo:Band})\
        OPTIONAL {\
          ?Band dbo:bandMember ?Artist .\
          ?Band dbp:name ?BandName .\
        } .\
        OPTIONAL {\
          ?FormerBand dbo:formerBandMember ?Artist .\
          ?FormerBand dbp:name ?FormerBandName\
        } .\
        OPTIONAL {\
          ?Artist dbo:bandMember ?Member .\
          ?Member dbp:name ?MemberName\
        } .\
        OPTIONAL {\
          ?Artist dbo:formerBandMember ?FormerMember .\
          ?FormerMember dbp:name ?FormerMemberName\
        } .\
      }";

var bandRelatedQuery = "PREFIX dbp: <http://dbpedia.org/property/>\
      PREFIX dbo: <http://dbpedia.org/ontology/>\
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
      SELECT DISTINCT ?Related1Name ?Related2Name ?Related3Name ?Related4Name WHERE {\
        ?Artist dbp:name ?ArtistName .\
        FILTER (EXISTS {?Artist rdf:type dbo:MusicalArtist} || EXISTS {?Artist rdf:type dbo:Band})\
        OPTIONAL {\
          ?Artist dbo:bandMember ?Member .\
          OPTIONAL {\
            ?Related1 dbo:bandMember ?Member .\
            ?Related1 dbp:name ?Related1Name\
          } .\
          OPTIONAL {\
            ?Related2 dbo:formerBandMember ?Member .\
            ?Related2 dbp:name ?Related2Name\
          }\
        } .\
        OPTIONAL {\
          ?Artist dbo:formerBandMember ?FormerMember .\
          OPTIONAL {\
            ?Related3 dbo:bandMember ?FormerMember .\
            ?Related3 dbp:name ?Related3Name\
          } .\
          OPTIONAL {\
            ?Related4 dbo:formerBandMember ?FormerMember .\
            ?Related4 dbp:name ?Related4Name\
          }\
        }\
      }"

var artistRelatedQuery = "PREFIX dbp: <http://dbpedia.org/property/>\
      PREFIX dbo: <http://dbpedia.org/ontology/>\
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
      SELECT DISTINCT ?Related1Name ?Related2Name ?Related3Name ?Related4Name WHERE {\
        ?Artist dbp:name ?ArtistName .\
        FILTER (EXISTS {?Artist rdf:type dbo:MusicalArtist} || EXISTS {?Artist rdf:type dbo:Band})\
        OPTIONAL {\
          ?Band dbo:bandMember ?Artist .\
          OPTIONAL {\
            ?Band dbo:bandMember ?Related1 .\
            ?Related1 dbp:name ?Related1Name\
          } .\
          OPTIONAL {\
            ?Band dbo:formerBandMember ?Related2 .\
            ?Related2 dbp:name ?Related2Name\
          }\
        } .\
        OPTIONAL {\
          ?FormerBand dbo:formerBandMember ?Artist .\
          OPTIONAL {\
            ?FormerBand dbo:bandMember ?Related3 .\
            ?Related3 dbp:name ?Related3Name\
          } .\
          OPTIONAL {\
            ?FormerBand dbo:formerBandMember ?Related4 .\
            ?Related4 dbp:name ?Related4Name\
          }\
        }\
      }"

export default class ArtistSparqlRepository {
  static getByName(name: string): Promise<Artist> {
    var client = Promise.promisifyAll(new SparqlClient(endpoint));
    var artist: Artist = new Artist();

    artist.name = name;
    var membersPromise = client
      .query(bandMemberQuery)
      .bind('ArtistName', "\"" + name + "\"@en")
      .executeAsync()
      .then(results => {
        for (var result of results.results.bindings) {
          artist.currentBands =  artist.currentBands ? artist.currentBands : [];
          artist.pastBands =  artist.pastBands ? artist.pastBands : [];
          artist.currentMembers =  artist.currentMembers ? artist.currentMembers : [];
          artist.pastMembers =  artist.pastMembers ? artist.pastMembers : [];

          result.BandName && artist.currentBands.push(result.BandName.value);
          result.FormerBandName && artist.pastBands.push(result.FormerBandName.value);
          result.MemberName && artist.currentMembers.push(result.MemberName.value);
          result.FormerMemberName && artist.pastMembers.push(result.FormerMemberName.value);
        }

        artist.currentBands = _.uniq(artist.currentBands);
        artist.pastBands = _.uniq(artist.pastBands);
        artist.currentMembers = _.uniq(artist.currentMembers);
        artist.pastMembers = _.uniq(artist.pastMembers);
        return artist;
      });

    var bandRelatedPromise = client
      .query(bandRelatedQuery)
      .bind('ArtistName', "\"" + name + "\"@en")
      .executeAsync()
      .then(results => {
        for (var result of results.results.bindings) {
          artist.relatedArtists = artist.relatedArtists ? artist.relatedArtists : [];

          result.Related1Name && artist.relatedArtists.push(result.Related1Name.value);
          result.Related2Name && artist.relatedArtists.push(result.Related2Name.value);
          result.Related3Name && artist.relatedArtists.push(result.Related3Name.value);
          result.Related4Name && artist.relatedArtists.push(result.Related4Name.value);
        }

        artist.relatedArtists = _.uniq(artist.relatedArtists);
        artist.relatedArtists = _.filter(artist.relatedArtists, related => !(related == name));
        return artist;
      });

    var artistRelatedPromise = client
      .query(artistRelatedQuery)
      .bind('ArtistName', "\"" + name + "\"@en")
      .executeAsync()
      .then(results => {
        for (var result of results.results.bindings) {
          artist.relatedArtists = artist.relatedArtists ? artist.relatedArtists : [];

          result.Related1Name && artist.relatedArtists.push(result.Related1Name.value);
          result.Related2Name && artist.relatedArtists.push(result.Related2Name.value);
          result.Related3Name && artist.relatedArtists.push(result.Related3Name.value);
          result.Related4Name && artist.relatedArtists.push(result.Related4Name.value);
        }

        artist.relatedArtists = _.uniq(artist.relatedArtists);
        artist.relatedArtists = _.filter(artist.relatedArtists, related => !(related == name));
        return artist;
      });

    return Promise.all([membersPromise, bandRelatedPromise, artistRelatedPromise]).then(() => {
      return artist;
    });
  }
}
