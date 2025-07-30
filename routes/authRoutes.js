// routes/authRoutes.js
const express = require('express');
const router = express.Router();

// Sample route to test
router.get('/ping', (req, res) => {
  res.send('pong');
});

module.exports = router;
