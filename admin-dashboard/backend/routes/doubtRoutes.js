const express = require('express');
const router = express.Router();
const Doubt = require('../models/Doubt');
const sendEmail = require('../utils/sendEmail');

// ✅ Route Test
router.get('/test', (req, res) => {
  res.send('✅ Doubt route working!');
});

// ✅ Submit Doubt
router.post('/submit', async (req, res) => {
  const {
    username = 'Course User',
    email,
    courseTitle,
    doubtText,
    message,
    source = 'cosmic',
  } = req.body;

  const finalDoubtText = doubtText || message;

  if (!username || !email || !courseTitle || !finalDoubtText) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newDoubt = new Doubt({
      username,
      email,
      courseTitle,
      doubtText: finalDoubtText,
      status: 'pending',
      resolved: false,
      source,
    });

    await newDoubt.save();
    res.status(201).json({ message: '✅ Doubt submitted successfully' });
  } catch (err) {
    console.error('❌ Error saving doubt:', err);
    res.status(500).json({ error: 'Failed to submit doubt' });
  }
});

// ✅ Respond to Doubt
router.post('/respond', async (req, res) => {
  const { doubtId, response } = req.body;

  if (!doubtId || !response) {
    return res.status(400).json({ error: 'Doubt ID and response are required' });
  }

  try {
    const doubt = await Doubt.findById(doubtId);
    if (!doubt) return res.status(404).json({ error: 'Doubt not found' });

    await sendEmail(
      doubt.email,
      'Response to Your Doubt',
      `<p><strong>Hello ${doubt.username},</strong></p><p>${response}</p><br/><p>Regards,<br/>UptoSkills Team</p>`
    );

    doubt.response = response;
    doubt.status = 'resolved';
    doubt.resolved = true;
    await doubt.save();

    res.status(200).json({ message: '✅ Doubt responded and marked as resolved' });
  } catch (err) {
    console.error('❌ Respond error:', err);
    res.status(500).json({ error: 'Failed to respond to doubt' });
  }
});

// ✅ Get All Doubts (no filter)
router.get('/', async (req, res) => {
  try {
    const doubts = await Doubt.find().sort({ createdAt: -1 });
    res.json(doubts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch doubts' });
  }
});

// ✅ Get Pending Doubts with source='cosmic'
router.get('/pending', async (req, res) => {
  try {
    const pending = await Doubt.find({
      status: 'pending',
      $or: [{ source: 'cosmic' }, { source: { $exists: false } }],
    }).sort({ createdAt: -1 });

    res.json(pending);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pending doubts' });
  }
});

// ✅ Get Resolved Doubts with source='cosmic'
router.get('/resolved', async (req, res) => {
  try {
    const resolved = await Doubt.find({
      status: 'resolved',
      $or: [{ source: 'cosmic' }, { source: { $exists: false } }],
    }).sort({ updatedAt: -1 });

    res.json(resolved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch resolved doubts' });
  }
});

// ✅ Count of Pending
router.get('/pending/count', async (req, res) => {
  try {
    const count = await Doubt.countDocuments({
      status: 'pending',
      $or: [{ source: 'cosmic' }, { source: { $exists: false } }],
    });

    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: 'Failed to count pending doubts' });
  }
});

// ✅ Count of Resolved
router.get('/resolved/count', async (req, res) => {
  try {
    const count = await Doubt.countDocuments({
      status: 'resolved',
      $or: [{ source: 'cosmic' }, { source: { $exists: false } }],
    });

    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: 'Failed to count resolved doubts' });
  }
});

// ✅ Delete Doubt
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ error: 'Invalid doubt ID format' });
  }

  try {
    const deleted = await Doubt.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Doubt not found' });

    res.json({ message: '🗑️ Doubt deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete doubt' });
  }
});

// 🚫 Prevent GET on /submit
router.get('/submit', (req, res) => {
  res.status(405).send('⚠️ Only POST requests are allowed on this route.');
});

// ✅ PATCH source = 'cosmic' where missing
router.get('/fix-missing-source', async (req, res) => {
  try {
    const result = await Doubt.updateMany(
      { source: { $exists: false } },
      { $set: { source: 'cosmic' } }
    );
    res.json({ message: `✅ Patched ${result.modifiedCount} doubts with missing source.` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to patch missing sources' });
  }
});

// 🧪 Debug: All doubts
router.get('/debug', async (req, res) => {
  const all = await Doubt.find();
  res.json(all);
});

// 🧪 Debug: Doubts with missing "source"
router.get('/debug-missing-source', async (req, res) => {
  const missing = await Doubt.find({ source: { $exists: false } });
  res.json(missing);
});

module.exports = router;





