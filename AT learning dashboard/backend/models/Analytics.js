const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    weeklyStudy: {
      type: [Number],
      default: () => [0, 0, 0, 0, 0, 0, 0],
      validate: {
        validator: arr => Array.isArray(arr) && arr.length === 7,
        message: 'weeklyStudy must be an array of 7 numbers (one for each day).'
      }
    },
    subjects: [
      {
        subject: {
          type: String,
          required: true,
          trim: true
        },
        score: {
          type: Number,
          min: 0,
          max: 100,
          required: true
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Analytics', AnalyticsSchema);

