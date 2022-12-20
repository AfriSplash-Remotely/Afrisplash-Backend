const url_parser = require('url');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const ErrorResponse = require('../utils/errorResponse');
const GoogleAuth = require('../model/googleAuth');
const Auth = require('../model/auth');
const User = require('../model/user');
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
    return res.redirect('/api/v1/oauth/signin');
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse('An error occured', 500));
  }
};

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

/**
 * @author Timothy Adeyeye <adeyeyetimothy33@gmail.com>
 * @description Sign in user after Google Oauth
 * @route `/api/v1/oauth/google/signin`
 * @access Public
 * @type GET
 */
exports.signinUser = async (req, res, next) => {
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

      // Create Google User Profile
      const googleProfile = new GoogleAuth({
        google_id: id,
        display_name: name,
        first_name: given_name,
        last_name: family_name,
        email: email,
        email_verified: verified_email,
        photo_url: picture
      });

      await googleProfile.save();

      return res.status(300).json({
        status: 'incomplete',
        id: googleProfile._id,
        message: 'Provide password and user_type to continue account sign up'
      });
    }
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse('An error occured', 500));
  }
};

/**
 * @author Timothy Adeyeye <adeyeyetimothy33@gmail.com>
 * @description Sign up user after Google Oauth
 * @route `/api/v1/oauth/google/signup`
 * @access Public
 * @type POST
 */
exports.signupUser = async (req, res, next) => {
  const { password, user_type, id } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();
  const opts = { session, new: true };

  try {
    // Find Google User
    const googleProfile = await GoogleAuth.findById({
      _id: id
    });

    const { first_name, last_name, email, email_verified } = googleProfile;

    // Create an Auth Profile
    const authProfile = Auth.create(
      [
        {
          email,
          password,
          account_verify: email_verified
        }
      ],
      opts
    );
    const authID = (await authProfile).at(0)._id;

    // Create a User Profile
    const userProfile = User.create(
      [
        {
          email,
          auth_id: authID,
          first_name,
          last_name,
          user_type
        }
      ],
      opts
    );
    const userID = (await userProfile).at(0)._id;
    const userData = (await userProfile).at(0);

    // Update Auth with User ID
    await Auth.findByIdAndUpdate(
      { _id: authID },
      { userID: userID },
      { new: true, session: session, runValidators: true }
    );

    await session.commitTransaction();
    session.endSession();

    const token = getSignedJwt(userID);

    const user = {
      email,
      first_name,
      last_name,
      email_verified,
      account_setup_completed: userData.account_setup_completed,
      user_type: userData.user_type
    };

    return res.status(200).cookie('token', token, options).json({
      success: true,
      token,
      user
    });
  } catch (error) {
    session.endSession();
    console.log(error);
    return next(
      new ErrorResponse(`${error.message || 'Unable to create account'}`, 500)
    );
  }
};
