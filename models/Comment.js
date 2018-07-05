const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  name: String,
  author: {
    username: String,
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pinterest-user'
    }
  },
  created: {
    type: Date,
    default: Date.now
  },
  edited: [
    {
      type: Date
    }
  ],
  deleted: {
    type: Boolean,
    default: false
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pinterest-user'
    }
  ],
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pinterest-comment'
    }
  ]
});

module.exports = mongoose.model('pinterest-comment', CommentSchema);
