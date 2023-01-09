/*
Documents utilisées:
Cours : https://canvas.supinfo.com/courses/507
Express : https://expressjs.com/en/5x/api.html
JWT : https://github.com/auth0/node-jsonwebtoken
Bcrypt : https://www.npmjs.com/package/bcrypt
*/

// Require
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

// User model
const User = require("../models/UserModel");
const auth = require("../middlewares/middleware.js");

// POST api/users/register
router
  .post("/signup", async (req, res) => {
    try {
      const { email, pseudo, password, role } = req.body;

      // Vérification si le mail ou le pseudo existe déjà
      const user = await User.findOne({ $or: [{ email }, { pseudo }] });
      if (user) {
        return res
          .status(400)
          .json({ message: "Email ou pseudo déjà utilisé" });
      }

      // Je créé le nouvel utilisateur
      const newUser = new User({ email, pseudo, password, role });

      // Je hash le password avec bcrypt
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);

      // Maintenant que tout est OK, j'enregistre le user en bdd
      await newUser.save();

      // Je créé la "session" pour rester connecté
      const payload = {
        user: {
          id: newUser.id,
          role: newUser.role,
        },
      };

      // Token de connexion
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );  
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Erreur serveur");
    }
  })

  // POST api/users/login
  .post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      // Vérif si l'adresse mail existe
      // Et renvoie un message qui n'explicite pas l'erreur
      // Il faut éviter de dire l'adresse mail est mauvaise
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Mauvaise adresse mail ou mot de passe" });
      }

      // Verif le password est bon avec le mail
      // Et renvoie un message qui n'explicite pas l'erreur
      // Il faut éviter de dire le mot de passe est mauvais
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Mauvaise adresse mail ou mot de passe" });
      }

      // Je créé la "session" pour rester connecté
      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };

      // Token de connexion
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Erreur serveur");
    }
  })

  // GET api/users/:id
  .get("/:id", auth, async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({ message: "Utilisateur inexistant" });
      }

      // Vérification si le role de l'utilisateur est suffisant pour accéder aux informations
      if (req.user.role !== "Employee" && req.user.id !== user.id) {
        return res.status(401).json({ message: "Non autorisé" });
      }

      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Erreur serveur");
    }
  })

  // PUT api/users/:id
  .put("/:id", auth, async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({ message: "Utilisateur inexistant" });
      }

      // Only the user or an admin can update the user's information
      if (req.user.id !== user.id && req.user.role !== "Admin") {
        return res.status(401).json({ message: "Non autorisé" });
      }

      const { email, pseudo, password, role } = req.body;

      // Update fields that are allowed to be updated
      user.email = email || user.email;
      user.pseudo = pseudo || user.pseudo;
      user.password = password || user.password;
      user.role = role || user.role;

      // Hash password if it was updated
      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }

      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Erreur serveur");
    }
  })

  // DELETE api/users/:id
  .delete("/:id", auth, async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({ message: "Utilisateur inexistant" });
      }

      // Only the user or an admin can delete the user
      if (req.user.id !== user.id && req.user.role !== "Admin") {
        return res.status(401).json({ message: "Non autorisé" });
      }

      await user.remove();
      res.json({ message: "Utilisateur supprimé" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Erreur serveur");
    }
  });

module.exports = router;
