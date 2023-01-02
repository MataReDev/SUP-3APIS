const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.set('strictQuery', false);
module.exports.connect = () =>  {
    mongoose.connect(MONGODB_URI,false
    //     , error => {
    //     if (error) {
    //         console.error('Connection failed');
    //         console.log(error);
    //     } else {
    //         if (callback) {
    //             callback(mongoose)
    //         }
    //     }
    // }
    )
}