// Exemple de modèle pour lié à la bdd
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    //_id: Number,
    id:{
        type: Number,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: true
    },
    pseudo:{
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
        enum: ['User', 'Employee'],
        required: true
    }
})

module.exports = mongoose.model('User', UserSchema)