'use strict';

import express = require('express');
import ArtistRepository from '../dao/artistRepository';
import ArtistSparqlRepository from '../dao/artistSparqlRepository';


export class ArtistController {
  static getAll(req: express.Request, res: express.Response):void {

    ArtistRepository
      .getAll()
      .then(artists => res.status(200).json(artists))
      .catch(error => res.status(400).json(error));
  }

  static getByName(req: express.Request, res: express.Response):void {
    ArtistSparqlRepository
      .getByName(req.params.name)
      .then(artist => res.status(200).json(artist))
      .catch(error => res.status(400).json(error));
  }

  static createArtist(req: express.Request, res: express.Response):void {
      let _artist = req.body;

      ArtistRepository
        .createArtist(_artist)
        .then(artist => res.status(201).json(artist))
        .catch(error => res.status(400).json(error));
  }

  static deleteArtist(req: express.Request, res: express.Response):void {
    let _id = req.params.id;

    ArtistRepository
      .deleteArtist(_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }
}
