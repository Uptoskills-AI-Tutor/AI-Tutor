const mongoose = require("mongoose");

const watchedVideoSchema = new mongoose.Schema({
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
    required: true,
    unique: true, // prevent duplicate entries for same video
  },
  watchedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("WatchedVideo", watchedVideoSchema);


