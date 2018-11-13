const express = require('express');
const Joi = require('joi'); // message schema validation  


const db = require('../db');
const messages = db.get('messages');

const schema = Joi.object().keys({
  name: Joi.string().min(1).max(500).required(),
  message: Joi.string().min(1).max(500).required(),
  latitude: Joi.number().min(1).max(180).required(),
  longitude: Joi.number().min(1).max(180).required(),
});

const router = express.Router();

router.get('/', (req, res) => {
  messages
    .find ()
    .then(allMessages => {
      res.json(allMessages);
    });
});

router.post('/', (req, res) => {
  // add current time
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    const { name, message, latitude, longitude } = req.body;
    const userMessage = {
      name,
      message,
      latitude,
      longitude,
      date: new Date()
    };
    messages
      .insert(userMessage)
      .then(insertedMessage => {
        res.json(insertedMessage);
      });
  } else {
    // forward error into error handler 
    next(result.error);
  }
});

module.exports = router;