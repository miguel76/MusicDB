'use strict';
var artistRoutes_1 = require('../api/artist/routes/artistRoutes');
var index_1 = require('../commons/static/index');
var Routes = (function () {
    function Routes() {
    }
    Routes.init = function (app, router) {
        artistRoutes_1.ArtistRoutes.init(router);
        router
            .route('*')
            .get(index_1.StaticDispatcher.sendIndex);
        app.use('/', router);
    };
    return Routes;
}());
exports.Routes = Routes;
//# sourceMappingURL=index.js.map