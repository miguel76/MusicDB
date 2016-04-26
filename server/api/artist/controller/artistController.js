'use strict';
var artistSparqlRepository_1 = require('../dao/artistSparqlRepository');
var ArtistController = (function () {
    function ArtistController() {
    }
    ArtistController.getByName = function (req, res) {
        artistSparqlRepository_1.default
            .getByName(req.params.name)
            .then(function (artist) { return res.status(200).json(artist); })
            .catch(function (error) { return res.status(400).json(error); });
    };
    ArtistController.addToBand = function (req, res) {
        artistSparqlRepository_1.default.addToBand(req.params.member, req.params.band);
        res.status(201).json({});
    };
    ArtistController.removeFromBand = function (req, res) {
        artistSparqlRepository_1.default.removeFromBand(req.params.member, req.params.band);
        res.status(204).json({});
    };
    return ArtistController;
})();
exports.ArtistController = ArtistController;
//# sourceMappingURL=artistController.js.map