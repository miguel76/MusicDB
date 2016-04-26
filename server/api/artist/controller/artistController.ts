'use strict';

import express = require('express');
import ArtistSparqlRepository from '../dao/artistSparqlRepository';

export class ArtistController {

  static getByName(req: express.Request, res: express.Response): void {
    ArtistSparqlRepository
      .getByName(req.params.name)
      .then(artist => res.status(200).json(artist))
      .catch(error => res.status(400).json(error));
  }

  static addToBand(req: express.Request, res: express.Response): void {
    ArtistSparqlRepository.addToBand(req.params.member, req.params.band);

    res.status(201).json({});
  }

  static removeFromBand(req: express.Request, res: express.Response): void {
    ArtistSparqlRepository.removeFromBand(req.params.member, req.params.band);

    res.status(204).json({});
  }
}
