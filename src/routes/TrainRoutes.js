
// Modules
const express = require("express");

//Router
const router = express.Router();

// Modèle
const Train = require("../models/TrainModel");

// Middleware
const authMiddleware = require('../middlewares/auth');

router
    // Lister tous les trains
    .get('/', (req, res) => {
        // Lancement de la recherche avec les parametres définis au dessus
        Train.find()
            .then(trains => res.status(200).send(trains))
            .catch(err => res.status(500).send(err));
    })

    // ADMIN - Créer un train
    .post('/', authMiddleware, (req, res) => {
        // Comme seul les admins ont accès à cette action, on vérifie si il est admins
        if (!req.user.admin) {
            return res.status(403).send({ error: 'Seul les admins peuvent mettre à jour un train' });
        }

        let train = new Train(req.body);
        train
            .save()
            .then(train => res.status(200).send(train))
            .catch(err => res.status(500).send(err));
    })

    // Rechercher un train
    .get('/:id', (req, res) => {
        Train.findById(req.params.id)
            .then(train => {
                if (!train) {
                    return res.status(404).send({ error: 'Train non trouvé' });
                }
                res.status(200).send(train);
            })
            .catch(err => res.status(500).send(err));
    })

    // ADMIN - Mettre à jour un train
    .put('/:id', authMiddleware, (req, res) => {
        // Comme seul les admins ont accès à cette action, on vérifie si il est admins
        if (!req.user.admin) {
            return res.status(403).send({ error: 'Seul les admins peuvent mettre à jour un train' });
        }

        // On utilise findByIdAndUpdate pour recherche un train et le mettre à jour dans la foulée
        Train.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(train => {
                if (!train) {
                    return res.status(404).send({ error: 'Train non trouvé' });
                }
                res.status(200).send(train);
            })
            .catch(err => res.status(500).send(err));
    })

    // ADMIN - Supprimer un train
    .delete('/:id', authMiddleware, (req, res) => {
        // Comme seul les admins ont accès à cette action, on vérifie si il est admins
        if (!req.user.admin) {
            return res.status(403).send({ error: 'Suel les admins peuvent supprimer des train' });
        }

        // On utilise findByIdAndDelete pour recherche un train et le supprimer dans la foulée
        Train.findByIdAndDelete(req.params.id)
            .then(train => {
                if (!train) {
                    return res.status(404).send({ error: 'Train not found' });
                }
                
                res.status(200).send(train);
            })
            .catch(err => res.status(500).send(err));
    })

module.exports = router