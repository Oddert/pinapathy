var router    = require('express').Router();

const User    = require('../models/User'),
      Board   = require('../models/Board'),

      middleware  = require('../middleware'),
      passport    = require('passport');

console.log('User Routes file loaded...');

router.post('/register', (req, res) => {
  console.log("Post from react:");
  console.log(req.body);
  let newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, (err, createdUser) => {
    if (err) {
      console.error(err);
      res.json({error: err});
    } else {
      passport.authenticate('local')(req, res, () => {
        res.json({message: 'Server says, data recieved!'});
      })
    }
  })
})

router.post('/login', (req, res) => {
  console.log(req.body);
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log(err);
      res.status(401).json(err);
      return;
    }

    if (user) {
      console.log('Logged user in');
      console.log(user);
      req.login(user, (err) => {
        if (err) {
          return res.status(401).json(err);
        }
        return res.status(200).json({
          message: 'User successfully logged in!'
        })
      });
    } else {
      res.status(401).json(info);
    }
  })(req, res);
});

router.post('/logout', (req, res) => {
  req.logOut();
  res.json({message: 'You are now signed out, come bac soon!'});
});

router.get('/:username', (req, res) => {
  User.findOne({username: req.params.username})
      .populate('boards')
      .exec((err, foundUser) => {
        if (err) {
          console.log(err);
          res.status(401).json(err);
        } else {
          res.status(200).json({
            message: 'Going to send you boards for this user',
            user: foundUser
          });
        }
      });
})


module.exports = router;
