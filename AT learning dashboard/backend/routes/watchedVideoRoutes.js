const express = require("express");
const router = express.Router();
const WatchedVideo = require("../models/WatchedVideo");

// POST: Mark video as watched
router.post("/", async (req, res) => {
  const { userId, videoId } = req.body;

  if (!userId || !videoId) {
    return res.status(400).json({ error: "userId and videoId are required" });
  }

  try {
    const existing = await WatchedVideo.findOne({ userId, videoId });

    if (existing) {
      return res.status(200).json({ message: "Already marked as watched" });
    }

    const watched = new WatchedVideo({ userId, videoId });
    await watched.save();

    res.status(201).json({ message: "Video marked as watched", watched });
  } catch (err) {
    console.error("❌ POST /api/watchedvideos error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET: All watched videos (admin/global)
router.get("/", async (req, res) => {
  try {
    const watched = await WatchedVideo.find();
    res.status(200).json({ watchedVideos: watched });
  } catch (err) {
    console.error("❌ GET /api/watchedvideos error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET: Watched videos by user
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const watched = await WatchedVideo.find({ userId });
    res.status(200).json({ watchedVideos: watched });
  } catch (err) {
    console.error("❌ GET /api/watchedvideos/user/:userId error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


