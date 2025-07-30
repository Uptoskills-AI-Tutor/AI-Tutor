require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const doubtRoutes = require('./routes/doubtRoutes');
const videoRoutes = require('./routes/videoRoutes'); // ✅ Import video routes

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Log incoming requests
app.use((req, res, next) => {
  console.log(`➡️  [${req.method}] ${req.originalUrl}`);
  next();
});

// Default route
app.get('/', (req, res) => {
  res.send('✅ API is running');
});

// Ignore favicon requests
app.get('/favicon.ico', (req, res) => res.status(204));

// ✅ Use routes
app.use('/api/doubts', doubtRoutes);
app.use('/api/videos', videoRoutes); // ✅ Mount video routes here

// Handle 404 for unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: '❌ Route not found' });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
console.log('🌐 Connecting to MongoDB at:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
