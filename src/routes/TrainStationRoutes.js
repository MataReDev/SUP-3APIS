
// Modules
const express = require("express");

//Router
const router = express.Router();

// Modèle
const TrainStation = require("../models/TrainStationModel");

//Middleware
const authMiddleware = require('../middlewares/auth');
const resizeMiddleware = require('../middlewares/resize');

router
    // Lister toutes les stations de trains
        .get('/', (req, res) => {
        let sort = req.query.sort || { name: 1 };

        TrainStation.find()
            .sort(sort)
            .then(trainStations => res.send(trainStations))
            .catch(err => res.status(500).send(err));
    })

    // Créer une station de train
    .post('/', authMiddleware, resizeMiddleware, (req, res) => {
        if (!req.user.admin) {
            return res.status(403).send({ error: 'Seul les admins peuvent créer des stations de trains' });
        }

        let trainStation = new TrainStation({
            name: req.body.name,
            open_hour: req.body.open_hour,
            close_hour: req.body.close_hour,
            image: req.body.image
        });
        trainStation
            .save()
            .then(trainStation => res.send(trainStation))
            .catch(err => res.status(500).send(err));
    })

    // Récupérer une stastion de train grâce à son id
    .get('/:id', (req, res) => {
        TrainStation.findById(req.params.id)
            .then(trainStation => {
            if (!trainStation) {
                return res.status(404).send({ error: 'Station de train introuvable' });
            }
            res.send(trainStation);
            })
            .catch(err => res.status(500).send(err));
    })

    // Mettre à jour une station de trains
    .put('/:id', authMiddleware, resizeMiddleware, (req, res) => {
        if (!req.user.admin) {
            return res.status(403).send({ error: 'Seul les admins peuvent mettre à jour les stations de trains' });
        }

        TrainStation.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            open_hour: req.body.open_hour,
            close_hour: req.body.close_hour,
            image: req.body.image
        }, { new: true })
            .then(trainStation => {
            if (!trainStation) {
                return res.status(404).send({ error: 'Station de train introuvable' });
            }
            res.send(trainStation);
            })
            .catch(err => res.status(500).send(err));
    })

    // Suprimmer une station de trains
    .delete('/:id', authMiddleware, (req, res) => {
        if (!req.user.admin) {
            return res.status(403).send({ error: 'Seul les admins peuvent supprimer des stations de trains' });
        }

        TrainStation.findByIdAndDelete(req.params.id)
        .then(trainStation => {
            if (!trainStation) {
            return res.status(404).send({ error: 'Station de train introuvable' });
            }
            res.send(trainStation);
        })
        .catch(err => res.status(500).send(err));
    });




module.exports = router