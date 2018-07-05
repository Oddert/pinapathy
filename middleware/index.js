const Board   = require('../models/Board');
const Pin     = require('../models/Pin');
const Comment = require('../models/Comment');

const middleware = {};

middleware.isLoggedIn = (req, res, next) => {
  console.log('User trying to access an auth route...');
  if (req.isAuthenticated()) {
    console.log('...User is logged in, porceading...');
    return next();
  } else {
    console.log('...User is not authed, redirecting...');
    res.json({
      error: 'denied',
      message: 'You need to be logged in to do that!'
    });
  }
}

middleware.checkBoardOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Board.findById(req.params.id, (err, foundBoard) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          error: 'Internal Server error, try again soon.',
          log: err
        })
      } else {
        if (foundBoard.author.id.equals(req.user._id)) {
          return next();
        } else {
          res.status(401).json({
            error: 'Access denied, you are not the author. Btw how did you get here? wtf'
          })
        }
      }
    })
  } else {
    console.log('...user is not auth\'ed, sending error...' );
    res.status(401).json({
      error: 'Access denied, you need to be logged in.'
    })
  }
}

middleware.checkPinOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Pin.findById(req.params.id, (err, foundPin) => {
      if (err) {
        console.log(err);
        res.status(500).json({error: err})
      } else {
        if (foundPin.author.id.equals(req.user._id)) {
          return next();
        } else {
          res.status(401).json({
            error: 'You do not own this pin and so cannot change it'
          })
        }
      }
    })
  } else {
    res.status(401).json({
      error: 'You need to be logged in to do that! \'/pin/:id @ checkPinOwenership'
    })
  }
}

middleware.checkCommentOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.id, (err, foundComment) => {
      if (err) {
        console.log(err);
        res.status(500).json({error: err})
      } else {
        if (foundComment.author.id.equals(req.user._id)) {
          return next();
        } else {
          res.status(401).json({
            error: 'You do not own this comment and so cannot modify it.'
          })
        }
      }
    })
  } else {
    res.status(401).json({
      error: 'You must be signed in to modify comments.'
    })
  }
}

module.exports = middleware;
