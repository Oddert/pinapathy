var router        = require('express').Router();

const User        = require('../models/User'),
      Pin         = require('../models/Pin'),
      Comment     = require('../models/Comment');

const middleware  = require('../middleware'),
      passport    = require('passport');

console.log('Comment routes loaded...');

router.get('/:id', (req, res) => {
  Comment.findById(req.params.id, (err, foundComment) => {
    if (err) {
      console.log(err);
      res.status(500).json({error: err});
    } else {
      if (req.isAuthenticated()) {
        User.findById(req.user._id, (err, foundUser) => {
          if (err) {
            console.log(err);
            res.status(500).json({error: err});
          } else {
            let hasLiked = false;
            foundComment.likes.forEach((each) => {
              if (each.equals(req.user._id)) { hasLiked = true }
            });
            res.status(200).json({
              message: 'Comment returned ok.',
              comment: foundComment,
              hasLiked
            })
          }
        })
      } else {
        res.status(200).json({
          message: 'Comment returned ok.',
          comment: foundComment,
          hasLiked: false
        })
      }
    }
  })
})//

router.post('/:id', middleware.isLoggedIn, (req, res) => {

  User.findById(req.user._id, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.status(500).json({error: err});
    } else {

      switch(req.body.targetType) {
        case 'PIN':
          Pin.findById(req.params.id, (err, foundPin) => {
            if (err) {
              console.log(err);
              res.status(500).json({error: err});
            } else {
              let newComment = {
                name: req.body.input,
                author: {
                  username: req.user.username,
                  id: req.user._id
                }
              }
              Comment.create(newComment, (err, createdComment) => {
                if (err) {
                  console.log(err);
                  res.status(500).json({error: err});
                } else {
                  foundUser.postedComments.push(createdComment._id);
                  foundUser.save();

                  foundPin.comments.push(createdComment._id);
                  foundPin.save();

                  res.json({
                    message: 'Comment successfully created!',
                  });
                }
              })
            }
          });
        break;
        default:
        res.status(500).json({
          error: 'This comment box is broken; targetType not recognised.'
        })
        break;
      }

    }
  });

})


router.put('/:id/like', middleware.isLoggedIn, (req, res) => {
  Comment.findById(req.params.id, (err, foundComment) => {
    if (err) {
      console.log(err);
      res.status(500).json({error: err});
    } else {
      console.log('Comment lookup ok');
      let hasAlreadyLiked = false;
      console.log(foundComment.likes);

      foundComment.likes.forEach((each) => {
        console.log(each);
        if (each.equals(req.user._id)) {hasAlreadyLiked = true}
      });

      console.log(hasAlreadyLiked);

      if (hasAlreadyLiked) {
        foundComment.likes.remove(req.user._id);
      } else {
        foundComment.likes.push(req.user._id);
      }

      console.log(foundComment.likes);
      foundComment.save();
      res.status(200).json({
        message: 'Going to like this pin',
        likes: foundComment.likes,
        hasAlreadyLiked
      })
    }
  });
})

router.put('/:id/edit', middleware.checkCommentOwnership, (req, res) => {

  Comment.findById(req.params.id, (err, foundComment) => {
    if (err) {
      console.log(err);
      res.status(500).json({error: err});
    } else {
      foundComment.name = req.body.name;
      // foundComment.edited.push(Date.now);
      foundComment.save();

      res.status(200).json({
        message: 'Comment updated!',
        comment: foundComment
      })
    }
  });
})


router.delete('/:id', middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndUpdate({deleted: true}, (err, updatedComment) => {
    if (err) {
      console.log(err);
      res.status(500).json({error: err});
    } else {
      res.status(200).json({
        message: 'Comment deleted.'
      });
    }
  })
})

module.exports = router;
