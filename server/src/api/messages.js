const express = require('express');
const Joi = require('joi'); // message schema validation  


const db = require('../db');
const messages = db.get('messages');

const schema = Joi.object().keys({
  username: Joi.string().alphanum().min(1).max(100).required(),
  message: Joi.string().alphanum().min(1).max(500).required(),
  latitude: Joi.number().min(1).max(180).required(),
  longitude: Joi.number().min(1).max(180).required(),
  date: Joi.date()
});

const router = express.Router();

router.get('/', (req, res) => {
  res.json([]); // currently just returns an empty array
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