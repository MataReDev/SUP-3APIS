const mongoose = require("mongoose");

const TrainStationSchema = new mongoose.Schema({
    id:{
        type: Number,
        unique: true,
        required: true
    },
    label: {
        type: String,
        required: true
    }, 
    open_hour: {
        type: Date,
        required: true
    }, 
    close_hour: {
        type: Date,
        required: true
    },
    trains: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Train'
    }], 
    image: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("TrainsStation", TrainStationSchema)