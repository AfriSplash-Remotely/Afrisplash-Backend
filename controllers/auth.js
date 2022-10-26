const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const _ = require("lodash");
const joi = require("joi")
const Auth = require("../model/auth")   
const User = require("../model/user")   
/**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description Registeration using Form Input For `All Account Type`
 * @route `/api/v1/auth/register`
 * @access Public
 * @type POST
 */
exports.register = asyncHandler(async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      if(!req.body.email){
        return next(new ErrorResponse("Email Address Is Required", 403));
      }
      const email = req.body.email.toLowerCase() ? req.body.email.toLowerCase() : ""
      const opts = { session, new: true };
      const checkAccount = await Auth.findOne({
        email: email,
      });
  
      if (!_.isEmpty(checkAccount)) {
        return next(new ErrorResponse("Email Address already exist", 400));
      }
      // Create an Authication Profile
      const authProfile = await Auth.create([{
            email: email,
            user_type:req.body.user_type,
            password:req.body.password
      }], opts);
  
      await authProfile[0].save();
    
      // Create an Authication Profile
      const user = await User.create([{
            email: email,
            auth_id:authProfile[0]._id,
            first_name:req.body.first_name,
            last_name:req.body.last_name
      }], opts);
        
      // TODO Send Verification Mail  -- Maybe
      // TODO Send Welcome Mail
      await session.commitTransaction();
      session.endSession();
      sendTokenResponse(user, 200, res);
    } catch (error) {
      session.endSession();
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
    const { email, password} = req.body;

    // Validate email & password 
    //TODO use Joi
    if (!email || !password) {
      return next(new ErrorResponse("Please provide an email and password", 400));
    }

    // Check for user
    const auth = await Auth.findOne({ email }).select("+password");
    
    if (!auth) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, auth.password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }else{
      const user = await User.findOne({email:auth.email})

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
    res.cookie("token", "none", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      data: {},
    });
});















// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = Array.isArray(user)
    ? user[0].getSignedJwtToken()
    : user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      token,
      user: Array.isArray(user) ? user[0] : user,
    });
};
