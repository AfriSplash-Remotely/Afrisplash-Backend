const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const mongoose = require("mongoose");
const _ = require("lodash");
const Auth = require("../model/auth")   
const User = require("../model/user")
const notification = require("../model/notification");
const gifts = require("../model/gifts");

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
    delete data.password
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
 * @type Depercated
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
    const skill = await User.findByIdAndUpdate(req.user._id, {$addToSet: {skills: req.body.skill}}, {
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


 /**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description Remove an Experience `Candidate Account Only`
 * @route `/api/v1/candidate/edit/remove/experience/`
 * @access Private
 * @type DELETE
 */
  exports.delExperience = asyncHandler(async (req, res, next) => {
    const data = await User.findByIdAndUpdate(req.user._id, {$pull: {experience: {_id: req.params.id}}}, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      status: "success",
      data: data
    });
  });


 /**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description Remove an Education `Candidate Account Only`
 * @route `/api/v1/candidate/edit/remove/education/`
 * @access Private
 * @type DELETE
 */
  exports.delEducation = asyncHandler(async (req, res, next) => {
    const data = await User.findByIdAndUpdate(req.user._id, {$pull: {education: {_id: req.params.id}}}, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      status: "success",
      data: data
    });
  });


 /**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description Remove a Langauge `Candidate Account Only`
 * @route `/api/v1/candidate/edit/remove/langauge/`
 * @access Private
 * @type DELETE
 */
  exports.delLangauge = asyncHandler(async (req, res, next) => {
    const data = await User.findByIdAndUpdate(req.user._id, {$pull: {langauge: {_id: req.params.id}}}, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      status: "success",
      data: data
    });
  });


 /**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description Remove a Skill `Candidate Account Only`
 * @route `/api/v1/candidate/edit/remove/skill/`
 * @access Private
 * @type DELETE
 */
  exports.delSkill = asyncHandler(async (req, res, next) => {
    const data = await User.findByIdAndUpdate(req.user._id, {$pop: {skill: req.params.id}}, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      status: "success",
      data: data
    });
  });


  /**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description Get User Gitfs `Candidate Account Only`
 * @route `/api/v1/candidate/gifts`
 * @access Private
 * @type GET
 */
 exports.getGifts = asyncHandler(async (req, res, next) => { 
  const data = await gifts.find({ _id: { $in: req.user.gifts } });
  res.status(200).json({
    success: true, 
    data: data
  })
 })


 /**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description Update User Choich For Interview Readiness `Candidate Account Only`
 * @route `/api/v1/candidate/readytointerview`
 * @access Private
 * @type PUT
 */
  exports.updateReadyToInterview = asyncHandler(async (req, res, next) => {
    const userState = req.user.Ready_to_interveiw

    const user = await User.findByIdAndUpdate(req.user._id, {Ready_to_interveiw : !userState}, {
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
 * @description Update User Contact infomation `Candidate Account Only`
 * @route `/api/v1/candidate/edit/user/contact`
 * @access Private
 * @type PUT
 */
 exports.updateUserContact = asyncHandler(async (req, res, next) => {
  const { phone, email, location} =  req.body
  const user = await User.findByIdAndUpdate(req.user._id, {
    phone_number:phone,
    email:email,
    location:location
  }, {
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
 * @description Update User Bio infomation `Candidate Account Only`
 * @route `/api/v1/candidate/edit/user/bio`
 * @access Private
 * @type PUT
 */
  exports.updateUserBio = asyncHandler(async (req, res, next) => {
    const { bio } =  req.body
    const user = await User.findByIdAndUpdate(req.user._id, {
      bio:bio,
    }, {
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
 * @description Update User Personal Infomation `Candidate Account Only`
 * @route `/api/v1/candidate/edit/user/`
 * @access Private
 * @type PUT
 */
  exports.updateUserPI = asyncHandler(async (req, res, next) => {
    const data =  req.body

    delete data.auth_id
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
    delete data.bio
    delete data.cover_letter
    delete data.cv
    delete data.langauge
    delete data.account_setup_completed
    delete data.location
    delete data.phone_number
    delete data.skills
    delete data.experience
    delete data.education
    delete data.jobs
    delete data.hide_detail
    delete data.ready_to_interview


    const user = await User.findByIdAndUpdate(req.user._id, data, {
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
 * @description Get User Saved Jobs `Candidate Account Only`
 * @route `/api/v1/candidate/jobs`
 * @access Private
 * @type GET
 */
 exports.getJobs = asyncHandler(async (req, res, next) => { 
  const data = await Jobs.find({ _id: { $in: req.user.jobs } });
  res.status(200).json({
    success: true, 
    data: data
  })
 })


 /**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description Remove a Jobs `Candidate Account Only`
 * @route `/api/v1/candidate/unsave/Job/:id`
 * @access Private
 * @type DELETE
 */
  exports.unSaveAJob = asyncHandler(async (req, res, next) => {
    const data = await User.findByIdAndUpdate(req.user._id, {$pop: {jobs: req.params.id}}, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      status: "success",
      data: data
    });
  });


/**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description Save A New Job `Candidate Account Only`
 * @route `/api/v1/candidate/job/:id`
 * @access Private
 * @type GET
 */
 exports.saveAJob = asyncHandler(async (req, res, next) => {
  //TODO  JOI VALIDATOR
  const data = await User.findByIdAndUpdate(req.user._id, {$push: {jobs: req.body.job}}, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    status: "success",
    data: data
  });
});
