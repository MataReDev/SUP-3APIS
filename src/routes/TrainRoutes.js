const express = require('express');

const router = express.Router();

const Train = require('../models/TrainModel');

router
.get("/findTrain",
    async (req, res) => {
        try {
            req.props =  {};
            if (req.query) for (var attrname in req.query) {
                req.props[attrname] = req.query[attrname];
            }
            const trains = await Train.find(req.props);
            res.send(trains)
        } catch (error) {
            console.error(error);
            res.status(400).send('Don\'t Exist');
        }


    }
)

// Seul un admin peut ajouter / modifier / supprimer un Train
.post("/addTrain",
    async (req, res) => {
        try {
            if (req.query.isAdmin == 'true') {
                let { email } = req.body
                let trainExist = await Train.findOne({ email });
                if (trainExist) {
                    return res.status(400).json({ msg: 'Train already exist'})
                }
                const trainAdd = await Train.create({ ... req.body });
                res.send(trainAdd)
            }
        } catch (err) {
            console.error('error');
            res.status(400).json({ error })

        }
    }
)

.delete("/deleteTrain",
    async (req, res) => {
        console.log(req.query);
        try {
            if (req.query.isAdmin == 'true') {
                const train = await Train.deleteOne({ "id": req.query.id})
                res.send(train)
            }
        } catch (error) {
            res.status(400).json({ msg: 'You dont have the permission'})
        }
    }
)

.put("/updateTrain",
    async (req, res) => {
        try {
            if (req.query.isAdmin == 'true') {
                const train = await Train.findByIdAndUpdate(req.query.id, { ...req.body});
                res.send(train);
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({error})
        }
    }
)


module.exports = router