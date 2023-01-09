const mongoose = require("mongoose");

const Train = require('../models/TrainModel');
const TrainStation = require('../models/TrainStationModel');

const TicketSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    train: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Train',
        required: true
    },
    start_station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TrainStation',
        required: true
    }, 
    end_station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TrainStation',
        required: true
    }, 
    time_of_departure: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model("Ticket", TicketSchema)