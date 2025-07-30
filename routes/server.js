// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

// Middleware
app.use(express.json()); // Enables reading JSON in request body

// Routes
const studentRoutes = require('./routes/studentRoutes'); // Import student routes
app.use('/student', studentRoutes); // Mount at /student

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/ai-tutor')
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));
