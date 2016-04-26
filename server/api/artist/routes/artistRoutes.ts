"use strict";

import express = require('express');

import {ArtistController} from '../controller/artistController';

export class ArtistRoutes {
    static init(router: express.Router) {
      router
        .route('/api/artists/:name')
        .get(ArtistController.getByName);

      router
        .route('/api/artists/:band/:member')
        .post(ArtistController.addToBand)
        .delete(ArtistController.removeFromBand);
    }
}
