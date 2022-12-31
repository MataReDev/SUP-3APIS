const express = require('express');

const router = express.Router();

const TrainStation = require('../models/TrainStationModel');

router
    .get("/allTrainStations", 
        async (req, res) => {
            try {
                const TrainStations = await TrainStation.find();
                res.send(TrainStations);
            }
            catch{
                console.error(error);
                res.status(400).send('No Train Station Exist');
            }
        }
    )
    .get("/findTrainStation",
        async (req, res) => {
            try {
                req.props =  {};
                if (req.query) for (var attrname in req.query) {
                    req.props[attrname] = req.query[attrname];
                }
                const trainStations = await TrainStation.find(req.props);
                res.send(trainStations)
            } catch (error) {
                console.error(error);
                res.status(400).send('Don\'t Exist');
            }
        }
    )
    /* Seul un admin peut ajouter / modifier / supprimer une station de Train*/
    .post("/addTrainStation",
        async (req, res) => {
            try {
                if (req.query.isAdmin == 'true') {
                    let { label } = req.body
                    let trainStationExist = await TrainStation.findOne({ label });
                    if (trainStationExist) {
                        return res.status(400).json({ msg: 'TrainStation already exist'})
                    }
                    const trainStationAdd = await TrainStation.create({ ... req.body });
                    res.send(trainStationAdd)
                }
            } catch (err) {
                console.error('error');
                res.status(400).json({ error })

            }
        }
    )
    .delete("/deleteTrainStation",
        async (req, res) => {
            console.log(req.query);
            try {
                if (req.query.isAdmin == 'true') {
                    const trainStation = await TrainStation.deleteOne({ "id": req.query.id})
                    res.send(trainStation)
                }
            } catch (error) {
                res.status(400).json({ msg: 'You dont have the permission'})
            }
        }
    )
    .put("/updateTrainStation",
        async (req, res) => {
            try {
                if (req.query.isAdmin == 'true') {
                    const trainStation = await TrainStation.findByIdAndUpdate(req.query.id, { ...req.body});
                    res.send(trainStation);
                }
            } catch (error) {
                console.log(error);
                res.status(400).json({error})
            }
        }
    )


module.exports = router