const url_parser = require('url');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const ErrorResponse = require('../utils/errorResponse');
const GoogleAuth = require('../model/googleAuth');
const googleClient = require('../utils/google-client');

/**
 * @author Timothy Adeyeye <adeyeyetimothy33@gmail.com>
 * @description Authenticaton with Google OAuth
 * @route `/api/v1/oauth/google/callback`
 * @access Public
 * @type GET
 */
exports.getUserProfile = async (req, res) => {
  try {
    const url = req.url;
    const parse = url_parser.parse(url, true);
    const code = parse.query.code;

    const { tokens } = await googleClient.getToken(code);

    const GOOGLE_API_URL = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`;

    const googleUser = await axios.get(GOOGLE_API_URL, {
      headers: {
        Authorization: `Bearer ${tokens.id_token}`
      }
    });

    // save user data to session
    req.session.googleUser = googleUser.data;
    return res.redirect('/api/v1/oauth/sign');
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse('An error occured', 500));
  }
};

/**
 * @author Timothy Adeyeye <adeyeyetimothy33@gmail.com>
 * @description Sign up/in user after Google Oauth
 * @route `/api/v1/oauth/google/callback`
 * @access Public
 * @type GET
 */
exports.signUser = async (req, res, next) => {
  try {
    const {
      id,
      email,
      verified_email,
      name,
      given_name,
      family_name,
      picture,
      locale
    } = req.session.googleUser;

    // find user in db
    const user = await GoogleAuth.findOne({
      email: email
    });

    // generate jwt
    const getSignedJwt = function (id) {
      return jwt.sign(
        {
          user: id
        },
        process.env.JWT_SECRET
      );
    };

    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') {
      options.secure = true;
    }

    if (user) {
      // account exist in db

      const token = getSignedJwt(user._id);

      return res.status(200).cookie('token', token, options).json({
        success: true,
        token,
        user: user
      });
    } else {
      // account does not exist in db

      //   create user object
      const userObj = new GoogleAuth({
        google_id: id,
        display_name: name,
        first_name: given_name,
        last_name: family_name,
        email: email,
        email_verified: verified_email,
        photo_url: picture
      });

      //   save user in db
      const new_user = await userObj.save();

      const token = getSignedJwt(new_user._id);

      return res.status(200).cookie('token', token, options).json({
        success: true,
        token,
        user: new_user
      });
    }
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse('An error occured', 500));
  }
};
