const passport        = require('passport'),
      GithubStrategy  = require('passport-github');

const keys            = require('./keys');

const User            = require('../models/User');

passport.serializeUser((user, done) => {
  console.log('serialize user running');
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('DEserialize user running');
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GithubStrategy({
    callbackURL: '/auth/github/redirect',
    clientID: keys.github.clientID,
    clientSecret: keys.github.clientSecret
  },
  (accessToken, refreshToken, profile, done) => {
    console.log('Passport Github callback confirmed');
    console.log(profile);

    //wtf does this profile obj look like??? ?? ?? ???? ???
    User.findOne({githubId: profile.id})
        .then((currentUser) => {
          console.log('User find returned');
          if (currentUser) {
            console.log('User found!');
            console.log(currentUser);
            done(null, currentUser);
          } else {
            new User({
              username: profile.username,
              githubId: profile.id
            })
            .save()
            .then((newUser) => {
              console.log('New User created!');
              console.log(newUser);
              done(null, newUser);
            })
          }
        })
  })
)


const profileSample =  {
  id: '23362989',
  displayName: 'Robyn Veitch',
  username: 'Oddert',
  profileUrl: 'https://github.com/Oddert',
  photos: [
    { value: 'https://avatars1.githubusercontent.com/u/23362989?v=4' }
  ],
  provider: 'github',
  // _raw: '{"login":"Oddert","id":23362989,"node_id":"MDQ6VXNlcjIzMzYyOTg5","avatar_url":"https://avatars1.githubusercontent.com/u/23362989?v=4","gravatar_id":"","url":"https://api.github.com/users/Oddert","html_url":"https://github.com/Oddert","followers_url":"https://api.github.com/users/Oddert/followers","following_url":"https://api.github.com/users/Oddert/following{/other_user}","gists_url":"https://api.github.com/users/Oddert/gists{/gist_id}","starred_url":"https://api.github.com/users/Oddert/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/Oddert/subscriptions","organizations_url":"https://api.github.com/users/Oddert/orgs","repos_url":"https://api.github.com/users/Oddert/repos","events_url":"https://api.github.com/users/Oddert/events{/privacy}","received_events_url":"https://api.github.com/users/Oddert/received_events","type":"User","site_admin":false,"name":"Robyn Veitch","company":null,"blog":"https://oddert.github.io/","location":"London","email":null,"hireable":true,"bio":"Student studying BA Product Design at CSM, UAL\\r\\nMinor experience with LUA and Arduino, looking to improve my coding ability for use in design work.","public_repos":18,"public_gists":0,"followers":0,"following":0,"created_at":"2016-11-09T16:43:54Z","updated_at":"2018-06-02T19:13:51Z","private_gists":0,"total_private_repos":0,"owned_private_repos":0,"disk_usage":630466,"collaborators":0,"two_factor_authentication":false,"plan":{"name":"free","space":976562499,"collaborators":0,"private_repos":0}}',
  _json:{
    login: 'Oddert',
    id: 23362989,
    node_id: 'MDQ6VXNlcjIzMzYyOTg5',
    avatar_url: 'https://avatars1.githubusercontent.com/u/23362989?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/Oddert',
    html_url: 'https://github.com/Oddert',
    followers_url: 'https://api.github.com/users/Oddert/followers',
    following_url: 'https://api.github.com/users/Oddert/following{/other_user}',
    gists_url: 'https://api.github.com/users/Oddert/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/Oddert/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/Oddert/subscriptions',
    organizations_url: 'https://api.github.com/users/Oddert/orgs',
    repos_url: 'https://api.github.com/users/Oddert/repos',
    events_url: 'https://api.github.com/users/Oddert/events{/privacy}',
    received_events_url: 'https://api.github.com/users/Oddert/received_events',
    type: 'User',
    site_admin: false,
    name: 'Robyn Veitch',
    company: null,
    blog: 'https://oddert.github.io/',
    location: 'London',
    email: null,
    hireable: true,
    bio: 'Student studying BA Product Design at CSM, UAL\r\nMinor experience with LUA and Arduino, looking to improve my coding ability for use in design work.',
    public_repos: 18,
    public_gists: 0,
    followers: 0,
    following: 0,
    created_at: '2016-11-09T16:43:54Z',
    updated_at: '2018-06-02T19:13:51Z',
    private_gists: 0,
    total_private_repos: 0,
    owned_private_repos: 0,
    disk_usage: 630466,
    collaborators: 0,
    two_factor_authentication: false,
    plan: {
      name: 'free',
      space: 976562499,
      collaborators: 0,
      private_repos: 0
    }
  }
}
