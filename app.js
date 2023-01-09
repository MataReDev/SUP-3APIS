/*
Documents utilisées:
Cours : https://canvas.supinfo.com/courses/507
Express : https://expressjs.com/en/5x/api.html
JWT : https://github.com/auth0/node-jsonwebtoken
Bcrypt : https://www.npmjs.com/package/bcrypt
Sharp : https://www.npmjs.com/package/sharp
*/

/* MODULES IMPORTÉS */
require("dotenv").config();
const PORT = process.env.PORT;
const database = require("./config/mongoose");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")

/* ROUTES */
const userRoutes = require("./src/routes/UserRoutes");
const trainRoutes = require("./src/routes/TrainRoutes");
const trainStationRoutes = require("./src/routes/TrainStationRoutes");

/* MONGO */
database.connect();

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Database connected"));


/* EXPRESS */
const app = express();
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

/* Gestion des routes pour l'uri */
app.use("/user",userRoutes);
app.use("/train",trainRoutes);
app.use("/trainstation",trainStationRoutes);

/* AFFICHAGE DU PORT SUR LEQUEL ON EST */
app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
})

module.exports = app;