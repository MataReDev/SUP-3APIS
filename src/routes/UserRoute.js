const express = require("express");

const router = express.Router();

const User = require("../models/UserModel");

router
  /* SING UP */
  .post("/signup", async (req, res) => {
    // Récupérez les données de l'utilisateur à partir de la requête
    const { username, email, password, isAdmin } = req.body;

    // Validez les données de l'utilisateur
    if (!username || !email || !password) {
      return res.status(400).send({ message: "Veuillez fournir un pseudo, un email et un mot de passe valides." });
    }

    // Vérifiez si l'utilisateur existe déjà en utilisant son email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "Cet utilisateur existe déjà." });
    }

    // Hash le mot de passe de l'utilisateur avant de l'enregistrer en utilisant un algorithme de hachage sécurisé comme bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créez un nouvel utilisateur avec les données fournies
    const user = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin
    });

    // Enregistrez l'utilisateur dans la base de données
    await user.save();

    // Envoyez une réponse de succès au client
    res.send({ message: "Utilisateur enregistré avec succès." });
  })

  /* LOGIN */
  .post("/login", async (req, res) => {
    // Récupérez les données de l'utilisateur à partir de la requête
    const { email, password } = req.body;
  
    // Validez les données de l'utilisateur
    if (!email || !password) {
      return res.status(400).send({ message: "Veuillez fournir un email et un mot de passe valides." });
    }
  
    // Cherchez l'utilisateur en utilisant son email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Aucun utilisateur n'a été trouvé avec cet email." });
    }
  
    // Vérifiez si le mot de passe de l'utilisateur correspond au hash stocké en utilisant bcrypt.compare
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).send({ message: "Mot de passe incorrect." });
    }
  
    // Générez un jeton de connexion en utilisant un outil comme jsonwebtoken
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  
    // Envoyez le jeton au client dans la réponse
    res.send({ token });
  })


  /* Delete User */
  // Suppression uniquement par l"utilisateur lui même ou par un admin
  .delete("/deleteUser", async (req, res) => {
    console.log(req.query);
    try {
      if (req.query.isAdmin == "true") {
        const user = await User.deleteOne({ email: req.query.email });
        res.send(user);
      }
    } catch (error) {
      res.status(400).json({ msg: "You dont have the permission" });
    }
  })
  // Update User
  // Mise à jour uniquement par l"utilisateur lui même ou par un admin
  .put("/updateUser", async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.query._id, { ...req.body });
      res.send(user);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  });

module.exports = router;
