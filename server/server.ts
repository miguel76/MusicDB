/// <reference path="../typings/main/ambient/bluebird/index.d.ts" />
/// <reference path="../typings/main/ambient/body-parser/index.d.ts" />
/// <reference path="../typings/main/ambient/express/index.d.ts" />
/// <reference path="../typings/main/ambient/express-serve-static-core/index.d.ts" />
/// <reference path="../typings/main/ambient/helmet/index.d.ts" />
/// <reference path="../typings/main/ambient/lodash/index.d.ts" />
/// <reference path="../typings/main/ambient/mime/index.d.ts" />
/// <reference path="../typings/main/ambient/mongoose/index.d.ts" />
/// <reference path="../typings/main/ambient/morgan/index.d.ts" />
/// <reference path="../typings/main/ambient/node/index.d.ts" />
/// <reference path="../typings/main/ambient/serve-static/index.d.ts" />

'use strict';

if ('production' === process.env.NODE_ENV)
    require('newrelic');

var PORT = process.env.PORT || 3333;

import * as express from 'express';
import * as os from 'os';
import * as http from 'http';
import {RoutesConfig} from './config/routes.conf';
import {DBConfig} from './config/db.conf';
import {Routes} from './routes/index';

const app = express();

RoutesConfig.init(app, express);
DBConfig.init();
Routes.init(app, express.Router());

http.createServer(app)
    .listen(PORT, () => {
      console.log(`up and running @: ${os.hostname()} on port: ${PORT}`);
      console.log(`enviroment: ${process.env.NODE_ENV}`);
    });
