"use strict";
var artistController_1 = require('../controller/artistController');
var ArtistRoutes = (function () {
    function ArtistRoutes() {
    }
    ArtistRoutes.init = function (router) {
        router
            .route('/api/artists/:name')
            .get(artistController_1.ArtistController.getByName);
        router
            .route('/api/artists/:band/:member')
            .post(artistController_1.ArtistController.addToBand)
            .delete(artistController_1.ArtistController.removeFromBand);
    };
    return ArtistRoutes;
})();
exports.ArtistRoutes = ArtistRoutes;
//# sourceMappingURL=artistRoutes.js.map