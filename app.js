const express = require('express');
const mongoose = require('mongoose');

const config = require('./configs/config.json');

const userRoutes = require('./src/routes/userRoutes');

const app = express();
const urlencodedParser = express.urlencoded({ extended: false});

app.use(urlencodedParser);
app.use(express.json());

mongoose.Promise = global.Promise;
mongoose.connect(config.db.uri, {
    // Do true
})

const db = mongoose.connection;
db.on("err", (err) => {
    console.log(err);
})

app.use("/users",userRoutes);
app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
})