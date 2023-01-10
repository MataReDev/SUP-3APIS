const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
    pseudo: {
        type: String,
        required: true
    }, 
    train: {
        type: String,
        required: true
    },
    isValidate: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("tickets", TicketSchema)