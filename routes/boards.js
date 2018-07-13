var router        = require('express').Router();

const User        = require('../models/User'),
      Board       = require('../models/Board'),

      middleware  = require('../middleware'),
      passport    = require('passport');

console.log('Boards routes file loaded...');

router.get('/:id', (req, res) => {
  console.log('Request to get board');
  Board.findById(req.params.id)
        .populate('pins')
        .exec((err, foundBoard) => {
          if (err) {
            console.log(err);
            res.status(500).json({error: err})
          } else {
            res.status(200).json({
              message: 'Found the board ok.',
              board: foundBoard
            })
          }
        })
})

router.get('/thumbnails/:id', (req, res) => {
  Board.findById(req.params.id)
        .populate('pins')
        .exec((err, foundBoard) => {
          if (err) {
            console.log(err);
            res.status(500).json({error: err});
          } else {
            res.status(200).json({
              message: 'Found thumbnails ok.',
              pins: foundBoard.pins.slice(0,3)
            })
          }
        })
})

router.post('/', middleware.isLoggedIn, (req, res) => {
  User.findById(req.body.id, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.status(401).json(err);
    } else {
      let newBoard = Object.assign({}, {
        name: req.body.title,
        description: req.body.description,
        author: {
          username: foundUser.username,
          id: foundUser._id
        }
      });

      Board.create(newBoard, (err, createdBoard) => {
        if (err) {
          console.log(err);
          res.status(401).json(err);
        } else {
          foundUser.boards.push(createdBoard._id);
          foundUser.save();
          res.json({
            message: 'User lookup ok. Board created ok! New Board is:',
            board: createdBoard
          })
        }
      });
    }
  })
})

router.put('/:id', middleware.checkBoardOwnership, (req, res) => {
  console.log('UPDATE REQUEST FOR BOARD');
  let updatedBoard = {name: req.body.name, description: req.body.description};
  Board.findByIdAndUpdate(req.params.id, updatedBoard, (err) => {
    if (err) {
      console.log(err);
      res.status(401).json({
        error: err
      });
    } else {
      res.status(200).json({
        message: 'Board successfully updated.'
      })
    }
  })
})

router.delete('/:id', middleware.checkBoardOwnership, (req, res) => {
  console.log('DELETE REQUEST FOR BOARD');
  User.findById(req.user._id, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      foundUser.boards.remove(req.params.id);
      foundUser.save();
      Board.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
          console.log(err);
          res.status(401).json(err);
        } else {
          res.json({
            message: 'Board successfully deleted.'
          })
        }
      })
    }
  })
})

module.exports = router;
