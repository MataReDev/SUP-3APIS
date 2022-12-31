// Seul un admin peut créer une station de train
const mongoose = require('mongoose');

const TrainStationSchema = new mongoose.Schema({
    id:{
        type: Number,
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
    image: {
        // Regarder du coté de GridFS
        type: String,
        required: true
        //200*200px maximum -> Si + grand redimenssionner
    }
})

module.exports = mongoose.model('TrainsStation', TrainStationSchema)