'use strict';

import express = require('express');

import * as fs from 'fs';

export class StaticDispatcher {
    static sendIndex(req: express.Request, res: express.Response):void {
      let _root = process.cwd();

      res.type('.html');

      fs.createReadStream(_root + '/client/dev/index.html')
        .pipe(res);
    }
}
