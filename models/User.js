const mongoose  = require('mongoose');
const PassportLocalMongoose   = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  githubId: String,
  pins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pinterest-pins'
    }
  ],
  boards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pinterest-board'
    }
  ],
  postedComments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pinterest-comment'
    }
  ]
});

UserSchema.plugin(PassportLocalMongoose);

module.exports = mongoose.model('pinterest-user', UserSchema);
