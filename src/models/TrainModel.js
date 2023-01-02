const mongoose = require('mongoose');

const TrainSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
    label: {
        type: String,
        required: true
    }, 
    start_station: {
        type: String,
        required: true
    }, 
    end_station: {
        type: String,
        required: true
    }, 
    time_of_departure: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Train', TrainSchema)