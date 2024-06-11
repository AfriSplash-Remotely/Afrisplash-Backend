const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const _ = require('lodash');
const joi = require('joi');
const Auth = require('../model/auth');
const User = require('../model/user');
const { validateChangePasswordSchema } = require('../middleware/validators');
const auth = require('../model/auth');

/**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description Registeration using Form Input For `All Account Type`
 * @route `/api/v1/auth/register`
 * @access Public
 * @type POST
 */
exports.register = asyncHandler(async (req, res, next) => {
  try {
    if (!req.body.email) {
      return next(new ErrorResponse('Email Address Is Required', 403));
    }
    const email = req.body.email.toLowerCase()
      ? req.body.email.toLowerCase()
      : '';

    const checkAccount = await Auth.findOne({
      email: email,
      userID: { $exists: true }
    }).populate('userID', 'user_type');

    if (checkAccount) {
      return next(
        new ErrorResponse(
          `Account already exist as a ${checkAccount.userID.user_type}`,
          409
        )
      );
    }

    // Create an Authication Profile
    const authProfile = await Auth.create(
      [
        {
          email: email,
          password: req.body.password
        }
      ],
      { new: true }
    );

    await authProfile[0].save();

    // Create a User Profile
    const user = await User.create(
      [
        {
          email: email,
          auth_id: authProfile[0]._id,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          user_type: req.body.user_type,
          gender: req.body.gender
        }
      ],
      { new: true }
    );

    // update Auth With Th User Data
    await Auth.findOneAndUpdate(
      { _id: authProfile[0]._id },
      {
        userID: user[0]._id
      },
      { new: true, runValidators: true }
    );

    // TODO Send Verification Mail  -- Maybe
    // TODO Send Welcome Mail
    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description Login using Form Input
 * @route `/api/v1/auth/login`
 * @access Public
 * @type POST
 */
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // Validate email & password
  //TODO use Joi
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user
  const auth = await Auth.findOne({
    email: email,
    userID: { $exists: true }
  }).populate('userID', 'user_type');

  if (!auth) {
    return next(new ErrorResponse('User does not exist!', 404));
  }

  // Check if password matches
  const isMatch = await bcrypt.compare(password, auth.password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  } else {
    const user = await User.findOne({ email: auth.email });

    sendTokenResponse(user, 200, res);
  }
});

/**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description Logout
 * @route `/api/v1/auth/logout`
 * @access Public
 * @type GET
 */
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});

/**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description Forgot Password
 * @route `/api/v1/auth/forgot-password`
 * @access Public
 * @type POST
 */
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const { generateOTP } = require('../utils/otpGen');
  const user = await Auth.findOne({
    email: req.body.email.toLowerCase(),
    userID: { $exists: true }
  });

  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404));
  }

  // Get reset token
  const resetToken = generateOTP(6);
  user.resetPasswordToken = resetToken;
  await user.save({ validateBeforeSave: false });

  console.log(resetToken);

  try {
    //TODO Send email

    res.status(200).json({ success: true, data: 'Email sent successfully' });
  } catch (err) {
    console.log(`email error `, err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse('Email could not be sent', 500));
  }
});

/**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description Reset Password
 * @route `/api/v1/auth/reset-password`
 * @access Public
 * @type POST
 */
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { email, new_password } = req.body;
  const user = await User.findOne({
    email: email
  });

  if (!user) {
    return next(
      new ErrorResponse(`User with this email ${email} does not exist`, 400)
    );
  }

  // Set new password
  user.password = new_password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = Array.isArray(user)
    ? user[0].getSignedJwtToken()
    : user.getSignedJwtToken();

  // const options = {
  //   expires: new Date(
  //     Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60
  //   ),
  //   httpOnly: true
  // };

  // if (process.env.NODE_ENV === 'production') {
  //   options.secure = true;
  // }

  return (
    res
      .status(statusCode)
      // .cookie('token', token, options)
      .json({
        success: true,
        token,
        user: Array.isArray(user) ? user[0] : user
      })
  );
};

/**
 * @author Timothy <adeyeyetimothy33@gmail.com>
 * @description Change Password
 * @route `/api/v1/auth/change-password`
 * @access Private
 * @type PUT
 */
exports.changePassword = async (req, res) => {
  try {
    // Validate the request body
    const { error, value } = validateChangePasswordSchema(req.body);
    if (error) return res.status(400).send(error.details);
    // retrieve request body
    const { currentPassword, newPassword } = value;

    const authDoc = await auth.findOne({
      _id: req.user.auth_id
    });

    if (!authDoc) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found'
      });
    }

    // check if password is match
    const isMatch = await authDoc.matchPassword(currentPassword);

    // if password no match
    if (!isMatch) {
      return res.status(401).json({
        status: 'fail',
        messsage: 'The current password does not match'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    // change password
    await auth.findOneAndUpdate(
      {
        _id: req.user.auth_id
      },
      {
        password: hashPassword
      }
    );

    return res.status(200).json({
      status: 'success',
      message: 'Password updated successfully'
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Unable to update password',
      error: error
    });
  }
};
