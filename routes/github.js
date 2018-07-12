const router      = require('express').Router(),
      passport    = require('passport');

const User        = require('../models/User');

const middleware  = require('../middleware');


console.log('Github routes loaded...');


router.get('/login', (req, res) => {
  res.send('Hello from the \'/auth/login route!');
})

router.post('/logout', (req, res) => {
  console.log('github logout route hit');
  req.logOut();
  res.status(200).json({message: 'You are now signed out, come bac soon!'});
});

router.get('/github', passport.authenticate('github', {
  scope: ['read:user']
}));

router.get('/github/redirect', passport.authenticate('github'), (req, res) => {
  console.log('github redirect route hit');
  res.redirect('/');
  
  // res.status(200).json({
  //   message: 'successfully logged in with github!'
  // });
})

module.exports = router;
