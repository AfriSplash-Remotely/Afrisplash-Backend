require('dotenv').config()
const GoogleStrategy = require('passport-google-oauth20').Strategy
const passport = require('passport')

const GoogleAuth = require('../model/googleAuth')

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/api/v1/oauth/google/callback',
    scope: ['email', 'profile']
}, function (accessToken, refreshToken, profile, callback) {
    const email = profile.emails[0].value

    // find if the user exist with the email
    GoogleAuth.findOne({
        email: email
    }).then((user) => {
        if(user){
            // account exist
    
            return callback(null, user)
        }else{
            // account does not exist
            new GoogleAuth({
                google_id: profile.id,
                display_name: profile.displayName,
                first_name: profile.name.givenName,
                last_name: profile.name.familyName,
                email: email,
                email_verified: profile.emails[0].verified,
                photo_url: profile.photos[0].value
            }).save(function(err, user){
                return callback(null, user)
            })
        }
    })
}))

// persist user data into session
passport.serializeUser((user, done) => {
    done(null, user)
})

// retrieve user data from session
passport.deserializeUser((user, done) => {
    done(null, user)
})