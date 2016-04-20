"use strict";

import express = require('express');

import {ArtistController} from '../controller/artistController';

export class ArtistRoutes {
    static init(router: express.Router) {
      router
        .route('/api/artists')
        .get(ArtistController.getAll)
        .post(ArtistController.createArtist);

      router
        .route('/api/artists/:name')
        .get(ArtistController.getByName)
        .delete(ArtistController.deleteArtist);
    }
}
