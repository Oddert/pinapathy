var router        = require('express').Router();

const User        = require('../models/User'),
      Board       = require('../models/Board'),
      Pin         = require('../models/Pin');

      middleware  = require('../middleware'),
      passport    = require('passport');

console.log('Pins routes file loaded...');

router.get('/', (req, res) => {
  Pin.find((err, pins) => {
    if (err) {
      console.log(err);
      res.status(500).json({error: err});
    } else {
      res.json({
        message: 'Pins returned ok.',
        pins
      });
    }
  })
});

router.get('/:id', (req, res) => {
  if (req.isAuthenticated()) {
    Pin.findById(req.params.id, (err, foundPin) => {
      if (err) {
        console.log(err);
        res.status(500).json({error: err});
      } else {
        let hasLiked = false;
        foundPin.likes.forEach((each) => {
          if (each.equals(req.user._id)) {hasLiked = true}
        });
        res.status(200).json({
          isAuth: true,
          hasLiked
        })
      }
    })
  } else {
    res.status(200).json({
      isAuth: false,
      hasLiked: false
    })
  }
})

router.post('/', middleware.isLoggedIn, (req, res) => {
  User.findById(req.user._id, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.status(500).json({error: err});
    } else {
      Board.findById(req.body.board, (err, foundBoard) => {
        if (err) {
          console.log(err);
          res.status(500).json({error: err})
        } else {
          if (foundBoard.author.id.equals(req.user._id)) {
            let newPin = {
              name: req.body.title,
              author: {
                id: req.user._id,
                username: req.user.username
              },
              img: {
                src: req.body.src,
                page: req.body.page
              },
              pinnedTo: []
            }
            Pin.create(newPin, (err, createdPin) => {
              if (err) {
                console.log(err);
                res.status(500).json({error: err});
              } else {
                createdPin.pinnedTo.push(foundBoard._id);
                createdPin.save();

                foundBoard.pins.push(createdPin._id);
                foundBoard.save();

                foundUser.pins.push(createdPin._id);
                foundUser.save();

                res.json({
                  message: 'Pin successfully created!',
                })
              }
            })

          } else {
            console.log('Big ol soddn error, how did they do that');
            res.status(500).json({
              error: 'You are not the owner of this board, stop pissin about kthxby'
            });
          }
        }
      })
    }
  })

})

router.put('/:id/like', middleware.isLoggedIn, (req, res) => {
  console.log('User attempting to like a pin...');
  User.findById(req.user._id, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      console.log('...user llokup ok...');
      Pin.findById(req.params.id, (err, foundPin) => {
        if (err) {
          console.log(err);
          res.status(500).json(err);
        } else {
          console.log('...pin lookup ok...');
          if (foundPin.author.id.equals(foundUser._id)) {
            res.status(401).json({error: 'You cannot like your own pins'});
          } else {
            console.log('User is not the author of the pin.');

            let alreadyLiked = false;
            foundPin.likes.forEach((each, index) => {
              if (each.equals(foundUser._id)) { alreadyLiked = true }
            });
            let action = '';
            if (alreadyLiked) {
              console.log('the user HAS already liked this pin');
              foundPin.likes.remove(foundUser._id);
              action = 'remove';
              console.log('...like removed');
            } else {
              console.log('the user HAS NOT already liked this pin');
              foundPin.likes.push(foundUser._id);
              action = 'add';
              console.log('...like added');
            }
            foundPin.save();
            console.log('pin saved');
            res.status(200).json({message: 'Pin updated!', action});
          }
        }
      })
    }
  })
})

router.put('/:id/repin', middleware.isLoggedIn, (req, res) => {
  console.log('User attempting to repin an item...');
  console.log(req.user);
  User.findById(req.user._id, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.status(500).json({error: err});
    } else {
      Board.findById(req.body.boardId, (err, foundBoard) => {
        if (err) {
          console.log(err);
          res.status(500).json({error: err});
        } else {
          Pin.findById(req.params.id, (err, targetPin) => {
            if (err) {
              console.log(err);
              res.status(500).json({error: err});
            } else {
              let newPin = {
                name: targetPin.name,
                description: targetPin.description,
                author: {
                  username: req.user.username,
                  id: req.user._id
                },
                img: targetPin.img,
                createdFrom: targetPin._id
              };
              Pin.create(newPin, (err, createdPin) => {
                if (err) {
                  console.log(err);
                  res.status(500).json({error: err});
                } else {
                  console.log('Pin create successfull');
                  console.log(createdPin);
                  createdPin.pinnedTo = [{
                    name: foundBoard.name,
                    id: foundBoard._id
                  }];
                  createdPin.save();

                  foundBoard.pins.push(createdPin._id);
                  foundBoard.save();

                  targetPin.repinnedTo = targetPin.repinnedTo ? targetPin.repinnedTo : [];
                  targetPin.repinnedTo.push({
                    name: createdPin.name,
                    id: createdPin._id
                  });
                  targetPin.save();

                  foundUser.pins.push(createdPin._id);
                  foundUser.save();

                  res.status(200).json({
                    message: 'Re Pin Sucessfull!'
                  });
                }
              })
            }
          });
        }
      })
    }
  })

});

router.put('/:id', middleware.checkPinOwnership, (req, res) => {
  let editedPin = req.body;
  console.log(editedPin);
  Pin.findByIdAndUpdate(req.params.id, editedPin, (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({error: err})
    } else {
      res.status(200).json({
        message: `Pin ${req.params.id} successfully updated!`,
        editedPin
      })
    }
  })
})

router.delete('/:id', middleware.checkPinOwnership, (req, res) => {
  Pin.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({error: err});
    } else {
      res.status(200).json({
        message: 'Pin deleted.'
      })
    }
  })
})

module.exports = router;
