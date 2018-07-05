var express       = require('express'),
    app           = express(),
    bodyParser    = require('body-parser'),
    cookieParser  = require('cookie-parser'),
    mongoose      = require('mongoose'),
    path          = require('path');

var passport      = require('passport'),
    LocalStrategy = require('passport-local');

const User        = require('./models/User'),
      Board       = require('./models/Board'),
      Pin         = require('./models/Pin'),
      Comment     = require('./models/Comment');

const middleware  = require('./middleware'),
      keys        = require('./locals/keys');

var userRoutes    = require('./routes/user'),
    boardRoutes   = require('./routes/boards'),
    pinRoutes     = require('./routes/pins'),
    commentRoutes = require('./routes/comment');

var port = 5000;

mongoose.connect("mongodb://" + keys.mongodb.MADE_WITH + ":" + keys.mongodb.SECRET + "@ds259499.mlab.com:59499/freecodecamp-playground");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname + '/client/build')));

app.use(require('express-session')({
  secret: 'Multivitamin and Mineral Food Supplement 180 Tablets. What does it do? This product contains essential nutrients',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: false
  }
}));

//checking location of auth branch

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});


//========== DEV routes ==========

app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'Jhon', lastName: 'Doe'},
    {id: 2, firstName: 'Steve', lastName: 'Smith'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'}
  ];
  res.json(customers);
});

app.post('/secret', middleware.isLoggedIn, (req, res) => {
  console.log(req.cookies);
  res.json({message: 'All good!'})
})

app.post('/isauth', (req, res) => {
  // console.log(req.cookies);
  let user = null;
  if (req.user) {
    user = req.user;
    console.log(user);
    User.findById(req.user._id)
        .populate('boards')
        .exec((err, currentUser) => {
          if (err) {
            res.status(500).json({
              error: err
            })
          } else {
            console.log(user);
            res.json({
              message: 'Request response from /isauth',
              authenticated: req.isAuthenticated(),
              user: currentUser
            })
          }
        })
  } else {
    console.log(user);
    res.json({
      message: 'Request response from /isauth',
      authenticated: req.isAuthenticated(),
      user
    })
  }
})

app.post('/githubauthtest', (req, res) => {
  res.json({message: 'Hello from the github tester. Are you ready for this? Cause I sure as hell aint'});
})

//========== / DEV routes ==========


app.use('/user', userRoutes);
app.use('/boards', boardRoutes);
app.use('/pin', pinRoutes);
app.use('/comment', commentRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});


app.listen(port, () => console.log(`${new Date().toLocaleTimeString()}: Express server initialised on port: ${port}...`));
