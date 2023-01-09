// Require
const express = require('express');
const Joi = require('joi');

// Router
const router = express.Router();

// Modèle
const Ticket = require('../models/TicketModel');
const User = require('../models/UserModel');
const Train = require('../models/TrainModel');

// Middleware
const authMiddleware = require('../middlewares/auth');

const ticketSchema = Joi.object().keys({
  pseudo: Joi.string().required(),
  train: Joi.string().required(),
  isValidated: Joi.bool()
});

// Book un ticket
router
  .post('/book', authMiddleware , async (req, res) => {
    const result = ticketSchema.validate(req.body);
    if (result.error) {
      return res.status(400).send(result.error);
    }

    const user = await User.findOne({pseudo: req.body.pseudo});
    if (!user) {
      return res.status(400).json({ message: "Utilisateur inexistant" });
    }

    const train = await Train.findOne({id: req.body.train});
    if (!train) {
      return res.status(400).json({ message: "Train inexistant" });
    }

    let ticket = new Ticket(req.body);
    ticket
      .save()
      .then(ticket => res.status(200).send(ticket))
      .catch(err => res.status(500).send(err));
  })
  
  .post('/validate', authMiddleware , async (req, res) => {
    if (req.user.role !== "Employee" && req.user.role !== "Admin"){
      return res.status(401).json({ message: "Non autorisé" });
    }

    const ticket = Ticket.find({pseudo: req.body.pseudo, train: req.body.train})
    if (!ticket) {
      return res.status(404).json({ message: "Ticket inexistant" });
    }
    if (ticket.isValidated == true){
      return res.status(200).json({ message: "Ticket déjà validé" });
    }

    try {
      let ticketUp = await Ticket.findOne({ pseudo: req.body.pseudo, train: req.body.train});

      ticketUp.isValidate = true;
      await ticketUp.save();

      return res.status(200).json({ message: "Ticket validé" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });

module.exports = router
