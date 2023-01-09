const express = require('express');
const ticketRouter = express.Router();
const Ticket = require('../models/ticket');
const Joi = require('joi');

const ticketSchema = Joi.object().keys({
  name: Joi.string().required(),
  train: Joi.string().required(),
  start_station: Joi.string().required(),
  end_station: Joi.string().required(),
  time_of_departure: Joi.date().required()
});

// Book a ticket
ticketRouter.post('/', (req, res) => {
  const result = Joi.validate(req.body, ticketSchema);
  if (result.error) {
    return res.status(400).send(result.error);
  }

  let ticket = new Ticket(req.body);
  ticket
    .save()
    .then(ticket => res.status(200).send(ticket))
    .catch(err => res.status(500).send(err));
});

app.use('/tickets', ticketRouter);
