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
        //200*200px maximum -> Si + grand redimenssionner
    }
})

module.exports = mongoose.model('TrainsStation', TrainSchema)