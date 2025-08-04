const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
});

const DiscussionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  tag: String,
  author: { type: String, default: 'Anonymous' },
  createdAt: { type: Date, default: Date.now },
  replies: [ReplySchema],
});

module.exports = mongoose.model('Discussion', DiscussionSchema);
