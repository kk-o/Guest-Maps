const express = require('express');

const messages = require('./messages');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏' 
  });
});

router.use('/messages', messages); // begin work on messages back-end

module.exports = router;
