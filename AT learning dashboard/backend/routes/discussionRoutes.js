const express = require('express');
const router = express.Router();
const Discussion = require('../models/Discussion');

// Get all threads
router.get('/', async (req, res) => {
  try {
    const threads = await Discussion.find().sort({ createdAt: -1 });
    res.json(threads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create thread
router.post('/', async (req, res) => {
  try {
    const thread = await Discussion.create(req.body);
    res.json(thread);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update thread
router.put('/:id', async (req, res) => {
  try {
    const updated = await Discussion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete thread
router.delete('/:id', async (req, res) => {
  try {
    await Discussion.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add reply
router.post('/:id/reply', async (req, res) => {
  try {
    const thread = await Discussion.findById(req.params.id);
    thread.replies.push({ text: req.body.text });
    await thread.save();
    res.json(thread);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
