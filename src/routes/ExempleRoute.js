const express = require('express');

const router = express.Router();

const User = require('../models/UserModels')

router
    .get("/find",

        async (req, res) => {

            try {
                req.props =  {};
                if (req.query) for (var attrname in req.query) {
                    req.props[attrname] = req.query[attrname];
                }
                const users = await User.find(req.props);
                res.send(users)
            } catch (error) {
                console.error(error);
                res.status(400).send('Don\'t Exist');
            }


        }
    )

    .post('/signup',
        async (req, res) => {
            console.log(req.body)

        const {
            email,
            isAdmin,
            personnage
        } = req.body

        try {
            let user = await User.findOne({ email })
            if (user){
                return res.status(400).json({
                    message: 'User already exist'
                })
            }
            user = new User({
                email,
                isAdmin,
                personnage
            })

            await user.save();
            const payload =  {
                user: {
                    id: user.id
                }
            }
        } catch (error) {

            console.error(error);
            res.status(500).send('Erreur lors de la sauvegarde')
        }
    }
    )

    .post("/add",
    async (req, res) => {
        try {
            let { email } = req.body
            let userExist = await User.findOne({ email });

            if (userExist) {
                return res.status(400).json({ msg: 'User already exist'})
            }
            const userAdd = await User.create({ ... req.body });
            res.send(userAdd)
        } catch (err) {
            console.error('error');
            res.status(400).json({ error })

        }
    }
    )
    
    .delete("/deleteUser",

        async (req, res) => {
            console.log(req.query);
            try {
                if (req.query.isAdmin == 'true') {
                    const user = await User.deleteOne({ "email": req.query.email})
                    res.send(user)
                }
            } catch (error) {
                res.status(400).json({ msg: 'You dont have the permission'})
            }
        }

    )

    .put("/update",

        async (req, res) => {

            try {
                console.log(req.query.id);

                const user = await User.findByIdAndUpdate(req.query._id, { ...req.body});
                res.send(user);
            } catch (error) {
                console.log(error);
                res.status(400).json({error})

            }

        }

    )


module.exports = router