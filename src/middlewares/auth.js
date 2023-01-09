const jwt = require('jsonwebtoken');
const User = require('../models/UserModel')

const auth = async (req, res, next) => {
  
    // Je récupère le token dans le header
    const token = req.headers.authorization.split(" ")[1];
  
    // Si y a pas de token, je renvoie une 401 avec comme réponse 'Pas de toekn, autorisation refusé'
    // La 401 c'est pour l'autorisation refusé
    if (!token) {
      return res.status(401).json({ message: 'Pas de token, autorisation refusé' });
    }
  
    try {
      // On vérifie le token et on récupère les infos de l'utilisateur
      const jwt_token = jwt.verify(token, process.env.JWT_SECRET);
      const user = User.findById(jwt_token.id);
      console.log(User.findById(jwt_token.id));
      req.user = user;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Le token n\'est pas bon' });
    }
  };
  
module.exports = auth;
  