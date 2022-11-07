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
  // Since this routes is hitted once after since up I would use create a check on this route
  // using the account_Setup_ Completed attribute in auth  Model any 
  // Review Should Hit me up 

  if(req.user.account_setup_completed){
    return next(new ErrorResponse("Account Has Been Onboarded Already \n Cant Post", 400))
  }

    const data = req.body
    delete data.auth_id
    delete data.first_name
    delete data.last_name
    delete data.user_type
    delete data._id
    delete data.email
    delete data.badge
    delete data.company_id
    delete data.company_role
    delete data.work_history
    delete data.created_at
    delete data.__v
    delete data.notifications
    delete data.settings
    delete data.jobs
    delete data.friend
    data.account_setup_completed = true


    const user = await User.findByIdAndUpdate(req.user._id, data, {
      new: true,
      runValidators: true,
    });

    await Auth.findOneAndUpdate({
      _userID:req.user._id
    },{
      account_setup_completed: true
    },{
      new: false, runValidators: true
    })
  
    res.status(200).json({
      success: true,
      status: "success",
      data: user,
    });
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
 * @description Add a new Experience `Candidate Account Only`
 * @route `/api/v1/candidate/edit/add/experience/`
 * @access Private
 * @type PUT
 */
  exports.addExperience = asyncHandler(async (req, res, next) => {
    const newExp = await User.findByIdAndUpdate(req.user._id, {$push: {experience: req.body}}, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      status: "success",
      data: newExp
    });
  });
  

/**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description Add a new Education `Candidate Account Only`
 * @route `/api/v1/candidate/edit/add/education/`
 * @access Private
 * @type PUT
 */
  exports.addEducation = asyncHandler(async (req, res, next) => {
    const newEdu = await User.findByIdAndUpdate(req.user._id, {$push: {education: req.body}}, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      status: "success",
      data: newEdu
    });
  });

    
/**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description Add a new Skills `Candidate Account Only`
 * @route `/api/v1/candidate/edit/add/skill/`
 * @access Private
 * @type PUT
 */
  exports.addSkill = asyncHandler(async (req, res, next) => {
    const skill = await User.findByIdAndUpdate(req.user._id, {$push: {skills: req.body.skill}}, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      status: "success",
      data: skill
    });
  });
  

/**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description Add a new Langauge `Candidate Account Only`
 * @route `/api/v1/candidate/edit/add/langauge/`
 * @access Private
 * @type PUT
 */
 exports.addLangauge = asyncHandler(async (req, res, next) => {
  console.log(req.body)
  const newLang = await User.findByIdAndUpdate(req.user._id, {$push: {langauge: req.body}}, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    status: "success",
    data: newLang
  });
});
