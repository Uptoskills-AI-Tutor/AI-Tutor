<<<<<<< HEAD
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
=======
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session'); // ✅ Needed for login sessions
const passport = require('passport');       // ✅ Required to handle OAuth
require('./config/passport');               // ✅ Google/GitHub strategy config
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5

const app = express();
const PORT = process.env.PORT || 5000;

console.log("🟡 Starting AI Tutor Backend...");

<<<<<<< HEAD
// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
=======
// ✅ Allow frontend access with cookies/session
app.use(cors({
  origin: 'http://localhost:5173', // <-- your frontend URL
  credentials: true                // <-- allow sending cookies
}));

// ✅ Middleware
app.use(express.json());

// ✅ Session middleware (required before passport)
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret', // Use strong secret in production
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: 'lax',
    // secure: true // Uncomment if using HTTPS
  }
}));

// ✅ Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// ✅ MongoDB Connection and Server Start
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/ai-tutor', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");

<<<<<<< HEAD
    // Routes
    const authRoutes = require('./routes/authRoutes');
    app.use('/api/auth', authRoutes);

    // Optional: load admin/dashboard routes only if files exist
=======
    // ✅ Auth Routes (Google/GitHub)
    const authRoutes = require('./routes/auth'); // changed from authRoutes
    app.use('/auth', authRoutes); // GitHub: /auth/github, Google: /auth/google

    // ✅ Optional Routes (if exist)
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5
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

<<<<<<< HEAD
    // Default route
=======
    // ✅ Health check route
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5
    app.get('/', (req, res) => {
      res.send('✅ AI Tutor Backend Running');
    });

<<<<<<< HEAD
    // Start Server
=======
    // ✅ Start server
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (err) {
<<<<<<< HEAD
    console.error("❌ Failed to connect or start server:", err.message);
=======
    console.error("❌ Failed to connect/start server:", err.message);
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5
  }
}

startServer();
