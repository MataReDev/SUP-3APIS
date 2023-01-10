
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
    // GET /trainstations
    .get('/', (req, res) => {
        TrainStation.find({}, (error, trainStations) => {
            if (error) {
              res.status(500).send(error);
            } else {
              res.send(trainStations);
            }
          });
    })

    // POST /trainstations
    .post('/', authMiddleware, resizeMiddleware, (req, res) => {
        try {
            if (req.user.role !== 'Admin') {
                return res.status(403).send({ error: 'Seul les admins peuvent créer des stations de trains' });
            }
            const trainStation = new TrainStation({
                label: req.body.label,
                image: req.body.imageGare,
                open_hour: req.body.open_hour,
                close_hour: req.body.close_hour
            });
            trainStation.save()
            res.status(200).json({ trainStation });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Erreur serveur");
        }
    })

    // GET /trainstations/:label
    .get('/:label', (req, res) => {
        TrainStation.find({label: req.params.label})
            .then(trainStation => {
            if (!trainStation) {
                return res.status(404).send({ error: 'Station de train introuvable' });
            }
            res.status(200).send(trainStation);
            })
            .catch(err => res.status(500).send(err));
    })

    // PUT /trainstation/:label
    .put('/:label', authMiddleware, resizeMiddleware, async (req, res) => {
        try {
            if (req.user.role !== 'Admin') {
                return res.status(403).send({ error: 'Vous n\'êtes pas autorisé à faire cette action' });
            }
            req.props = {};
            
            console.log(req.body.label);
        
            // Vérification si le role de l'utilisateur est suffisant pour accéder aux informations
            if (req.body)
            for (let attrname in req.body) {
                console.log(attrname);
                req.props[attrname] = req.body[attrname];
            }
            console.log(req.props);
        
            const trainStation = TrainStation.find({label: req.params.label})
            // Utilisez le modèle de schéma pour récupérer tous les utilisateurs de la base de données
            trainStation.update(req.props, (err, trainStation) => {
                if (err) {
                    throw err;
                } else {
                    res.status(200).send("Gare mise à jour");
                }
            });
        } catch (err) {
          console.error(err.message);
          res.status(500).send("Erreur serveur");
        }
    })

    // DELETE /trainstation/:label
    .delete('/:label', authMiddleware, async (req, res) => {
        if (req.user.role !== 'Admin') {
            return res.status(403).send({ error: 'Seul les admins peuvent supprimer des stations de trains' });
        }
        
        try{
            await TrainStation.remove({label: req.params.label});
            res.status(200).send("Gare suppimée")
        } catch (error) {
            console.error(error);
            res.status(500).send("Erreur serveur");
        }
    });

module.exports = router