const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

console.log("🟡 Starting AI Tutor Backend...");

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/ai-tutor', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");

    // Routes
    const authRoutes = require('./routes/authRoutes');
    app.use('/api/auth', authRoutes);

    // Optional: load admin/dashboard routes only if files exist
    try {
      const adminRoutes = require('./routes/adminRoutes');
      app.use('/api/admin', adminRoutes);
    } catch (err) {
      console.warn("⚠️ Skipping /api/admin - adminRoutes.js not found");
    }

    try {
      const dashboardRoutes = require('./routes/dashboardRoutes');
      app.use('/api/dashboard', dashboardRoutes);
    } catch (err) {
      console.warn("⚠️ Skipping /api/dashboard - dashboardRoutes.js not found");
    }

    // Default route
    app.get('/', (req, res) => {
      res.send('✅ AI Tutor Backend Running');
    });

    // Start Server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("❌ Failed to connect or start server:", err.message);
  }
}

startServer();
