const mongoose = require("mongoose");

// Define the video schema
const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    topic: {
      type: String,
      trim: true,
    },
    level: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"], // ✅ Only allowed values
      default: "Pending",
    },
    videoUrl: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Export the model
module.exports = mongoose.model("Video", videoSchema);

