// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'User', trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: { type: String, required: true, select: false },
    platform: { type: String, default: 'Email & Password' },

    // New fields for settings
    bio: { type: String, default: '' },
    avatar: { type: String, default: '' },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: false },
      weeklySummary: { type: Boolean, default: true },
    },
    theme: { type: String, default: 'system' },
    language: { type: String, default: 'en' },

    // User Role
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.password;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model('User', userSchema);


