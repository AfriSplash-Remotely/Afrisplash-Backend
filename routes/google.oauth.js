const router = require('express').Router();
const passport = require('passport')

const {
    loginFailed,
    profile,
} = require('../controllers/google.auth')


router.get('/index', (req, res)=>{
    return res.status(200).send('Authentication Service with Google Oauth2')
})

router.get('/login/failed', loginFailed)

router.get('/google', passport.authenticate('google', ['profile', 'email']))

router.get(
    '/google/callback',
    passport.authenticate('google', {
        successRedirect: '/api/v1/oauth/profile',
        failureRedirect: '/api/v1/oauth/login/failed'
    })
)

router.get('/profile', profile)


module.exports = router;