const express = require('express');
const database = require('./config/mongoose');
const mongoose = require('mongoose');
const PORT = process.env.DEV_PORT;

const userRoutes = require('./src/routes/UserRoute');
const trainRoutes = require('./src/routes/TrainRoutes');
const trainStationRoutes = require('./src/routes/TrainStationRoutes');


const app = express();
const urlencodedParser = express.urlencoded({ extended: false });

database.connect();

app.use(urlencodedParser);
app.use(express.json);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Database connected'));

app.use('/user',userRoutes);
app.use('/train',trainRoutes);
app.use('/trainstation',trainStationRoutes);

app.listen(PORT, () => {
    console.log(`App listenging on ${PORT}`);
})