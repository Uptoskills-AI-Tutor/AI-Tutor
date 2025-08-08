// backend/routes/videoRoutes.js

const express = require('express');
const router = express.Router();
const Video = require('../models/Video');

// ------------------------------------------------------------------
// @route   GET /api/videos
// @desc    Fetch all videos with optional filters and pagination
// ------------------------------------------------------------------
router.get('/', async (req, res) => {
  const { page = 1, limit = 5, topic, level, status, search } = req.query;

  const filters = {};

  if (topic) filters.topic = topic;
  if (level) filters.level = level;
  if (status) filters.status = status;
  if (search) {
    filters.title = { $regex: search, $options: 'i' }; // case-insensitive search
  }

  try {
    const total = await Video.countDocuments(filters);
    const videos = await Video.find(filters)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json({
      videos,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Server error while fetching videos' });
  }
});

// ------------------------------------------------------------------
// @route   GET /api/videos/:id
// @desc    Fetch a single video by ID
// ------------------------------------------------------------------
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching video' });
  }
});

// ------------------------------------------------------------------
// @route   POST /api/videos
// @desc    Create a new video
// ------------------------------------------------------------------
router.post('/', async (req, res) => {
  const { title, videoUrl } = req.body;

  if (!title || !videoUrl) {
    return res.status(400).json({ error: 'Title and video URL are required' });
  }

  try {
    const newVideo = new Video(req.body);
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (error) {
    console.error('Error creating video:', error);
    res.status(500).json({ error: 'Failed to create video' });
  }
});

// ------------------------------------------------------------------
// @route   PUT /api/videos/:id
// @desc    Update a video by ID
// ------------------------------------------------------------------
router.put('/:id', async (req, res) => {
  try {
    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedVideo) {
      return res.status(404).json({ error: 'Video not found' });
    }

    res.status(200).json(updatedVideo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update video' });
  }
});

// ------------------------------------------------------------------
// @route   DELETE /api/videos/:id
// @desc    Delete a video by ID
// ------------------------------------------------------------------
router.delete('/:id', async (req, res) => {
  try {
    const deletedVideo = await Video.findByIdAndDelete(req.params.id);

    if (!deletedVideo) {
      return res.status(404).json({ error: 'Video not found' });
    }

    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete video' });
  }
});

module.exports = router;

