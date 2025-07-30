const mongoose = require('mongoose');

const doubtSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    courseTitle: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true,
    },
    doubtText: {
      type: String,
      required: [true, 'Doubt text is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'resolved'],
      default: 'pending',
    },
    response: {
      type: String,
      default: '',
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Doubt', doubtSchema);
