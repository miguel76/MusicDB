'use strict';

import express = require('express');

import {ArtistRoutes} from '../api/artist/routes/artistRoutes';
import {StaticDispatcher} from '../commons/static/index';

export class Routes {
   static init(app: express.Application, router: express.Router) {
     ArtistRoutes.init(router);

     router
       .route('*')
       .get(StaticDispatcher.sendIndex);

     app.use('/', router);
   }
}
