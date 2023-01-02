const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
    password: {
        type: String,
        //required: true
    },
    role: {
        type: String,
        enum: ["User", "Employee"],
        //required: true
    },
    isAdmin: {
        type: Boolean,
        //required: true
    }
})

module.exports = mongoose.model("User", UserSchema)