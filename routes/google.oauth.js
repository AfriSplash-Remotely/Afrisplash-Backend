const router = require('express').Router();

const googleClient = require('../utils/google-client');

const {
  getUserProfile,
  signinUser,
  signupUser
} = require('../controllers/google.auth');

router.get('/google', (req, res) => {
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ];

  const oauthscreenurl = googleClient.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes
  });
  res.redirect(oauthscreenurl);
});

router.get('/google/callback', getUserProfile);

router.get('/signin', signinUser);

router.post('/signup', signupUser);

module.exports = router;
