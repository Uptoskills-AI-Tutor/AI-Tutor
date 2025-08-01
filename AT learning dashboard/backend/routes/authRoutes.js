// backend/routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const User = require('../models/User');

const router = express.Router();

// Check JWT secret
if (!process.env.JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not set in .env');
  process.exit(1);
}

// Utility: sign JWT token
const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

// Utility: async wrapper for routes
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Middleware: Check if request has a valid JWT
const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.split(' ')[1] : null;
  if (!token)
    return res.status(401).json({ success: false, message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    return res
      .status(401)
      .json({ success: false, message: 'Invalid or expired token' });
  }
};

// Rate limiter for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

// --------- TEST ROUTE (for debugging) ----------
router.get('/test', (req, res) => {
  res.json({ success: true, message: 'Auth route is working!' });
});

// --------- SIGNUP (expects { name, email, password }) ----------
router.post(
  '/signup',
  authLimiter,
  asyncHandler(async (req, res) => {
    const { name = 'User', email, password } = req.body || {};
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'Email & password are required' });
    }

    const emailNorm = email.trim().toLowerCase();
    const exists = await User.findOne({ email: emailNorm });
    if (exists) {
      return res
        .status(409)
        .json({ success: false, message: 'Email already registered' });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email: emailNorm, password: hash });

    const token = signToken(user._id);
    return res.status(201).json({
      success: true,
      message: 'Signup successful',
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  })
);

// --------- LOGIN (expects { email, password }) ----------
router.post(
  '/login',
  authLimiter,
  asyncHandler(async (req, res) => {
    let { email, password } = req.body || {};
    email = (email || '').trim().toLowerCase();

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'Email & password are required' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok)
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });

    const token = signToken(user._id);
    return res.json({
      success: true,
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  })
);

// --------- ME (protected) ----------
router.get(
  '/me',
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.userId).select('-password');
    if (!user)
      return res.status(404).json({ success: false, message: 'User not found' });

    return res.json({ success: true, user });
  })
);

module.exports = router;

