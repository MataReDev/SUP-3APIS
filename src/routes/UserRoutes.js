// Modules
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Router
const router = express.Router();

// Modèle
const User = require("../models/UserModel");

// Middleware
const auth = require("../middlewares/auth.js");

// POST /user/signup
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
          pseudo: newUser.pseudo,
          email: newUser.email
        },
      };

      // Token de connexion
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        }
      );  
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Erreur serveur");
    }
  })

  // POST /user/login
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
          pseudo: user.pseudo,
          email: user.email
        },
      };

      // Token de connexion
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Erreur serveur");
    }
  })

  // GET /user/find
  .get("/find", auth, async (req, res) => {
    try {
      if (req.user.role === 'User') {
        return res.status(403).send({ error: 'Vous n\'êtes pas autorisé à faire cette action' });
      }
      req.props = {};
      
      console.log(req.query.email);

      // Vérification si le role de l'utilisateur est suffisant pour accéder aux informations
      
      if (req.query)
      for (let attrname in req.query) {
        req.props[attrname] = req.query[attrname];
      }
      console.log(req.props);

      // Utilisez le modèle de schéma pour récupérer tous les utilisateurs de la base de données
      User.find(req.props, (err, user) => {
        if (err) {
          throw err;
        } else {
          res.status(200).send(user);
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Erreur serveur");
    }
  })

  // PUT /user/update
  .put("/update", auth, async (req, res) => {
    try {
      if (req.user.role !== 'Admin') {
        return res.status(403).send({ error: 'Vous n\'êtes pas autorisé à faire cette action' });
      }
      req.props = {};
      
      console.log(req.query.email);

      // Vérification si le role de l'utilisateur est suffisant pour accéder aux informations
      if (req.query)
      for (let attrname in req.query) {
        if (attrname === "password"){
          const salt = await bcrypt.genSalt(10);
          req.props[attrname] = await bcrypt.hash(req.query[attrname], salt);
          console.log("password")
        } else {
          console.log(attrname);
          req.props[attrname] = req.query[attrname];
        }
      }
      console.log(req.props);

      // Utilisez le modèle de schéma pour récupérer tous les utilisateurs de la base de données
      User.updateOne(req.props, (err, user) => {
        if (err) {
          throw err;
        } else {
          res.status(200).send("Utilisateur mis à jour");
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Erreur serveur");
    }
  })

  // DELETE /user/:username
  .delete("/:username", auth, async (req, res) => {
    try {
      req.props = {};
      
      console.log(req.query.email);

      // Vérification si le role de l'utilisateur est suffisant pour accéder aux informations
      
      if (req.query)
      for (let attrname in req.query) {
        req.props[attrname] = req.query[attrname];
      }
      console.log(req.props);

      // Utilisez le modèle de schéma pour récupérer tous les utilisateurs de la base de données
      User.deleteOne(req.props, (err, user) => {
        if (err) {
          throw err;
        } else {
          res.status(200).send("Utilisateur supprimé");
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Erreur serveur");
    }
  });

module.exports = router;
