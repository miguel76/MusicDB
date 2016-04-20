"use strict";
var artistController_1 = require('../controller/artistController');
var ArtistRoutes = (function () {
    function ArtistRoutes() {
    }
    ArtistRoutes.init = function (router) {
        router
            .route('/api/artists')
            .get(artistController_1.ArtistController.getAll)
            .post(artistController_1.ArtistController.createArtist);
        router
            .route('/api/artists/:name')
            .get(artistController_1.ArtistController.getByName)
            .delete(artistController_1.ArtistController.deleteArtist);
    };
    return ArtistRoutes;
}());
exports.ArtistRoutes = ArtistRoutes;
//# sourceMappingURL=artistRoutes.js.map