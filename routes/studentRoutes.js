// routes/studentRoutes.js
const express = require('express');
const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  res.send('Student route working!');
});

// Register route
router.post('/register', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).send('Name and email are required');
  }
  res.send(`Registered student: ${name} (${email})`);
});

module.exports = router;
