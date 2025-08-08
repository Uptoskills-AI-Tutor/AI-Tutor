const express = require('express');
const router = express.Router();
const Analytics = require('../models/Analytics');

// GET /api/analytics/:userId — Fetch analytics for a user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const analytics = await Analytics.findOne({ userId });

    if (!analytics) {
      return res.status(404).json({ message: 'No analytics found for this user.' });
    }

    res.status(200).json(analytics);
  } catch (err) {
    console.error(`❌ GET /api/analytics/${userId} error:`, err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/analytics — Create or update analytics for a user
router.post('/', async (req, res) => {
  const { userId, weeklyStudy = [], subjects = [] } = req.body;

  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'Valid userId is required.' });
  }

  try {
    let analytics = await Analytics.findOne({ userId });

    if (analytics) {
      // Update existing
      analytics.weeklyStudy = weeklyStudy;
      analytics.subjects = subjects;
      await analytics.save();
      return res.status(200).json({
        message: 'Analytics updated successfully.',
        data: analytics,
      });
    }

    // Create new
    const newAnalytics = await Analytics.create({
      userId,
      weeklyStudy,
      subjects,
    });

    res.status(201).json({
      message: 'Analytics created successfully.',
      data: newAnalytics,
    });
  } catch (err) {
    console.error('❌ POST /api/analytics error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;


