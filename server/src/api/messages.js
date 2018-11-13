const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json([]); // currently just returns an empty array
});

module.exports = router;
