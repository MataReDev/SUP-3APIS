const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  // Email unique en base
    email: {
      type: String,
      required: true,
      unique: true
    },
    
  // Pseudo unique en base
    pseudo: {
      type: String,
      required: true,
      unique: true
    },
    
  // Mot de passe (utilisation de bcrypt pour hash le mdp)
    password: {
      type: String,
      required: true
    },
    
  // role uniquement dans la liste décrite en dessous avec comme valeur de base User
    role: {
      type: String,
      required: true,
      enum: ['User', 'Employee', 'Admin'],
      default: 'User'
    }
});

module.exports = mongoose.model("User", UserSchema)