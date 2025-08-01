require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Route imports
const authRoutes = require('./routes/authRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const discussionRoutes = require('./routes/discussionRoutes');
const userRoutes = require('./routes/userRoutes');
const watchedVideoRoutes = require('./routes/watchedVideoRoutes'); // ✅ NEW

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Log active routes
console.log('✅ Loaded Routes:', {
  authRoutes: typeof authRoutes,
  analyticsRoutes: typeof analyticsRoutes,
  discussionRoutes: typeof discussionRoutes,
  userRoutes: typeof userRoutes,
  watchedVideoRoutes: typeof watchedVideoRoutes,
});

// ✅ Base route
app.get('/', (req, res) => {
  res.send('📊 AI Tutor Backend is running!');
});

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/discussions', discussionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/watchedvideos', watchedVideoRoutes); // ✅ NEW

// ✅ 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at: http://localhost:${PORT}/`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

