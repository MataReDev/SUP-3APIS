const express = require("express");

const router = express.Router();

const User = require("../models/UserModel");

router
    .post("/signup",
        async (req, res) => {
            console.log(req.body);

            const {
                email,
                pseudo
            } = req.body

            try {
                user = new User({
                    email,
                    pseudo
                })
                await user.save()

            } catch (error) {
                console.error("error");
                res.status(500).send("Error lors de la sauvegarde")
            }

            // try {
                // let { email } = req.body.email
                // let userExist = await User.findOne({ email });
                // if (userExist) {
                //     return res.status(400).json({ msg: "User already exist"})
                // }
                // let newUser = new User.create({ 
                //     email: req.body.email,
                //     pseudo: req.body.pseudo
                // });
                // newUser.save(); 
                // return res.status(200).json({msg: newUser})

            // } catch (err) {
            //     console.error("error");
            //     res.status(400).json({ error })

            // }
        }
    )
    // Read User
    .get("/readUser",
        async (req, res) => {
            // try {
            //     req.props =  {};
            //     if (req.query) for (var attrname in req.query) {
            //         req.props[attrname] = req.query[attrname];
            //     }
            //     const users = await User.find(req.props);
            //     res.send(users)
            // } catch (error) {
            //     console.error(error);
            //     res.status(400).send("Don\'t Exist");
            // }
            res.status(200).send("Ok");


        }
    )
    // Delete User
    // Suppression uniquement par l"utilisateur lui même ou par un admin
    .delete("/deleteUser",
        async (req, res) => {
            console.log(req.query);
            try {
                if (req.query.isAdmin == "true") {
                    const user = await User.deleteOne({ "email": req.query.email})
                    res.send(user)
                }
            } catch (error) {
                res.status(400).json({ msg: "You dont have the permission"})
            }
        }
    )
    // Update User
    // Mise à jour uniquement par l"utilisateur lui même ou par un admin
    .put("/updateUser",
        async (req, res) => {
            try {
                const user = await User.findByIdAndUpdate(req.query._id, { ...req.body});
                res.send(user);
            } catch (error) {
                console.log(error);
                res.status(400).json({error})
            }
        }
    )


module.exports = router