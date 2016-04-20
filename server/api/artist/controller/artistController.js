'use strict';
var artistRepository_1 = require('../dao/artistRepository');
var artistSparqlRepository_1 = require('../dao/artistSparqlRepository');
var ArtistController = (function () {
    function ArtistController() {
    }
    ArtistController.getAll = function (req, res) {
        artistRepository_1.default
            .getAll()
            .then(function (artists) { return res.status(200).json(artists); })
            .catch(function (error) { return res.status(400).json(error); });
    };
    ArtistController.getByName = function (req, res) {
        artistSparqlRepository_1.default
            .getByName(req.params.name)
            .then(function (artist) { return res.status(200).json(artist); })
            .catch(function (error) { return res.status(400).json(error); });
    };
    ArtistController.createArtist = function (req, res) {
        var _artist = req.body;
        artistRepository_1.default
            .createArtist(_artist)
            .then(function (artist) { return res.status(201).json(artist); })
            .catch(function (error) { return res.status(400).json(error); });
    };
    ArtistController.deleteArtist = function (req, res) {
        var _id = req.params.id;
        artistRepository_1.default
            .deleteArtist(_id)
            .then(function () { return res.status(200).end(); })
            .catch(function (error) { return res.status(400).json(error); });
    };
    return ArtistController;
}());
exports.ArtistController = ArtistController;
//# sourceMappingURL=artistController.js.map