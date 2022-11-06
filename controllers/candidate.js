const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const mongoose = require("mongoose");
const _ = require("lodash");
const Auth = require("../model/auth")   
const User = require("../model/user")
const notification = require("../model/notification");

/**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description Compeleting Onboarding on Candidate Account `Candidate Account Only`
 * @route `/api/v1/candidate/onboarding`
 * @access Private
 * @type POST
 */
exports.onboarding = asyncHandler(async (req, res, next) => {
    const session = await mongoose.startSession();
    const { image, bio, companyName, positionHeld, location, jobType, startDay, endDay, currentlyWork, description, institutionName, degree, fieldOfStudy } = req.body
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
 * @description Get User Profile Complete `Candidate Account Only`
 * @route `/api/v1/candidate/`
 * @access Private
 * @type GET
 */
 exports.profile = asyncHandler(async (req, res, next) => {
  const data = await User.find({_id: req.user._id}).select({auth_id:0, _id:0})
  res.status(200).json({
    success: true, 
    data: data
  })
 })


 /**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description Update User `Candidate Account Only`
 * @route `/api/v1/candidate/edit`
 * @access Private
 * @type PUT
 */
 exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    status: "success",
    data: user,
  });
});


/**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description Get User Notifications `Candidate Account Only`
 * @route `/api/v1/candidate/`
 * @access Private
 * @type GET
 */
 exports.getNotifications = asyncHandler(async (req, res, next) => {
  //TODO remove last updated 
  const data = await notification.find({_id: req.user._id}).select({to:0, _id:0})
  res.status(200).json({
    success: true, 
    data: data
  })
 })


 