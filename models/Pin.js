const mongoose = require('mongoose');

const PinSchema = new mongoose.Schema({
  name: String,
  description: String,
  pinnedTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pinterest-board'
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
  img: {
    page: String,
    src: String
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pinterest-user'
    }
  ],
  createdFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pinterest-pin'
  },
  repinnedTo: [
    {
      name: String,
      date: {
        type: Date,
        default: Date.now
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pinterest-board'
      }
    }
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pinterest-comment'
    }
  ]
})

module.exports = mongoose.model('pinterest-pin', PinSchema);
