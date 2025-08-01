const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// GET user by ID (for frontend initialization)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'User not found' });
  }
});

// UPDATE profile: name, email, bio, avatar
router.put('/:id/profile', async (req, res) => {
  const { name, email, bio, avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, bio, avatar },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Profile update failed' });
  }
});

// UPDATE notifications
router.put('/:id/notifications', async (req, res) => {
  const { email, push, weeklySummary } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        notifications: { email, push, weeklySummary },
      },
      { new: true }
    );
    res.json(user.notifications);
  } catch (err) {
    res.status(500).json({ error: 'Notification update failed' });
  }
});

// UPDATE theme
router.put('/:id/theme', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { theme: req.body.theme },
      { new: true }
    );
    res.json({ theme: user.theme });
  } catch (err) {
    res.status(500).json({ error: 'Theme update failed' });
  }
});

// UPDATE language
router.put('/:id/language', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { language: req.body.language },
      { new: true }
    );
    res.json({ language: user.language });
  } catch (err) {
    res.status(500).json({ error: 'Language update failed' });
  }
});

// UPDATE password
router.put('/:id/password', async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.params.id).select('+password');

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ error: 'Current password is incorrect' });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Password update failed' });
  }
});

module.exports = router;
