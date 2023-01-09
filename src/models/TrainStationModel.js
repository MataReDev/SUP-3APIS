const mongoose = require("mongoose");

const TrainStationSchema = new mongoose.Schema({
    label: {
        type: String,
        unique: true,
        required: true
    }, 
    image: {
        type: String,
        required: true
    }, 
    open_hour: {
        type: String,
        required: true
    }, 
    close_hour: {
        type: String,
        required: true
    },
    trains: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Train'
    }]
})

module.exports = mongoose.model("trainstations", TrainStationSchema)