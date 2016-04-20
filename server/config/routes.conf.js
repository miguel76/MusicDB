'use strict';
var morgan = require('morgan');
var bodyParser = require('body-parser');
var contentLength = require('express-content-length-validator');
var helmet = require('helmet');
var RoutesConfig = (function () {
    function RoutesConfig() {
    }
    RoutesConfig.init = function (application, exp) {
        var _clientFiles = (process.env.NODE_ENV === 'production') ? '/client/dist/' : '/client/dev/';
        var _root = process.cwd();
        application.use(exp.static(_root));
        application.use(exp.static(_root + _clientFiles));
        application.use(bodyParser.json());
        application.use(morgan('dev'));
        application.use(contentLength.validateMax({ max: 999 }));
        application.use(helmet());
    };
    return RoutesConfig;
}());
exports.RoutesConfig = RoutesConfig;
//# sourceMappingURL=routes.conf.js.map