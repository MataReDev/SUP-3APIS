// Exemple de modèle pour lié à la bdd
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // _id: Number,
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    personnage:{
        type: String,
        enum: ['Elf', 'Mage de feu', "Nain", "Ogre"],
        required: true
    }
})

module.exports = mongoose.model('User', UserSchema)