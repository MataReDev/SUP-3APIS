
// Modules
const express = require("express");

//Router
const router = express.Router();

// Modèle
const Train = require("../models/TrainModel");
const TrainStation = require('../models/TrainStationModel');

// Middleware
const authMiddleware = require('../middlewares/auth');

router
    // GET /train
    .get('/', async (req, res) => {
        await Train.find({}, (error, trains) => {
            if (error) {
              res.status(500).send(error);
            } else {
              res.send(trains);
            }
        });
    })

    // POST /train
    .post('/', authMiddleware, async (req, res) => {
        try {
            if (req.user.role !== 'Admin') {
                return res.status(403).send({ error: 'Seul les admins peuvent créer des stations de trains' });
            }
            const startStation = await TrainStation.findOne({label: req.body.start_station});
            const endStation = await TrainStation.findOne({label: req.body.end_station});

            const train = new Train({
                id: req.body.id,
                label: req.body.label,
                start_station: startStation._id,
                end_station: endStation._id,
                time_of_departure: req.body.time_of_departure
            });
            train.save()
            res.status(200).json({ train });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Erreur serveur");
        }
    })

    // GET /train/:id
    .get('/:id', async (req, res) => {
        try {
            const train = await Train.findOne({id: req.params.id});
      
            if (!train) {
              return res.status(404).json({ message: "Train inexistant" });
            }
      
            res.status(200).json(train);

          } catch (err) {
            console.error(err.message);
            res.status(500).send("Erreur serveur");
          }
    })

    // PUT /train/:id
    .put('/:id', authMiddleware, async (req, res) => {
        try {
            if (req.user.role !== 'Admin') {
                return res.status(403).send({ error: 'Vous n\'êtes pas autorisé à faire cette action' });
            }
            req.props = {};
        
            // Vérification si le role de l'utilisateur est suffisant pour accéder aux informations
            if (req.body)
            for (let attrname in req.body) {
                console.log(attrname);
                req.props[attrname] = req.body[attrname];
            }
        
            const train = Train.find({id: req.params.id})
            if (!train) {
                return res.status(404).json({ message: "Train inexistant" });
              }
            // Utilisez le modèle de schéma pour récupérer tous les utilisateurs de la base de données
            train.update(req.props, (err, train) => {
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

    // DELETE /train/:id
    .delete('/:id', authMiddleware, async (req, res) => {
        if (req.user.role !== 'Admin') {
            return res.status(403).send({ error: 'Vous n\'êtes pas autorisé à faire cette action' });
        }

        try{
            await Train.remove({id: req.params.id});
            res.status(200).send("Train suppimé")
        } catch (error) {
            console.error(error);
            res.status(500).send("Erreur serveur");
        }
    })

module.exports = router