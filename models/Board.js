const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
  name: String,
  description: String,
  pins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pinterest-pin'
    }
  ],
  created: {
    type: Date,
    default: Date.now
  },
  deleted: {
    type: Boolean,
    default: false
  },
  author: {
    username: String,
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pinterest-user'
    }
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pinterest-comment'
    }
  ]
})

module.exports = mongoose.model('pinterest-board', BoardSchema);
