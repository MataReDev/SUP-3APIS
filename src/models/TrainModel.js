const mongoose = require("mongoose");

const TrainSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true
    },
    label: {
        type: String,
        required: true
    }, 
    start_station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station',
        required: true
    }, 
    end_station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station',
        required: true
    }, 
    time_of_departure: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("trains", TrainSchema)