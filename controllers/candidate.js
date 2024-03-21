const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const mongoose = require('mongoose');
const _ = require('lodash');
const Auth = require('../model/auth');
const User = require('../model/user');
const notification = require('../model/notification');
const gifts = require('../model/gifts');
const jobs = require('../model/jobs');
const { UserJobType } = require('../utils/enum');
const ObjectId = require('mongodb').ObjectId;

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

  if (req.user.account_setup_completed) {
    return next(
      new ErrorResponse('Account Has Been Onboarded Already \n Cant Post', 400)
    );
  }
  console.log('user', req.body.user_type);

  const data = req.body;
  delete data.auth_id;
  delete data.first_name;
  delete data.last_name;
  delete data.user_type;
  delete data._id;
  delete data.email;
  delete data.badge;
  delete data.password;
  delete data.company_id;
  delete data.company_role;
  delete data.work_history;
  delete data.created_at;
  delete data.__v;
  delete data.notifications;
  delete data.settings;
  delete data.jobs;
  delete data.friend;
  delete data.role;
  data.account_setup_completed = true;

  const user = await User.findByIdAndUpdate(req.user._id, data, {
    new: true,
    runValidators: true
  });

  await Auth.findOneAndUpdate(
    {
      _userID: req.user._id
    },
    {
      account_setup_completed: true
    },
    {
      new: false,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    status: 'success',
    data: user
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
  const data = await User.find({ _id: req.user._id }).select({
    auth_id: 0,
    _id: 0
  });
  res.status(200).json({
    success: true,
    data: data
  });
});

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
    runValidators: true
  });

  res.status(200).json({
    success: true,
    status: 'success',
    data: user
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
  const data = await notification
    .find({ _id: req.user._id })
    .select({ to: 0, _id: 0 });
  res.status(200).json({
    success: true,
    data: data
  });
});

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
    runValidators: true
  });

  res.status(200).json({
    success: true,
    status: 'success',
    data: user
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
  const newExp = await User.findByIdAndUpdate(
    req.user._id,
    { $push: { experience: req.body } },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    status: 'success',
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
  const newEdu = await User.findByIdAndUpdate(
    req.user._id,
    { $push: { education: req.body } },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    status: 'success',
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
  const skill = await User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { skills: req.body } },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    status: 'success',
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
exports.addLanguage = asyncHandler(async (req, res, next) => {
  const newLang = await User.findByIdAndUpdate(
    req.user._id,
    { $push: { langauge: req.body } },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    status: 'success',
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
  const data = await User.findByIdAndUpdate(
    req.user._id,
    { $pull: { experience: { _id: req.params.id } } },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    status: 'success',
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
  const data = await User.findByIdAndUpdate(
    req.user._id,
    { $pull: { education: { _id: req.params.id } } },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    status: 'success',
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
exports.delLanguage = asyncHandler(async (req, res, next) => {
  const data = await User.findByIdAndUpdate(
    req.user._id,
    { $pull: { langauge: { _id: req.params.id } } },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    status: 'success',
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
  const data = await User.findByIdAndUpdate(
    req.user._id,
    { $pop: { skill: req.params.id } },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    status: 'success',
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
  });
});

/**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description Update User Choich For Interview Readiness `Candidate Account Only`
 * @route `/api/v1/candidate/readytointerview`
 * @access Private
 * @type PUT
 */
exports.updateReadyToInterview = asyncHandler(async (req, res, next) => {
  const userState = req.user.ready_to_interview;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { ready_to_interview: !userState },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    status: 'success',
    data: user
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
  const { phone, email, location } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      phone_number: phone,
      email: email,
      location: location
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    status: 'success',
    data: user
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
  const { bio } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      bio: bio
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    status: 'success',
    data: user
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
  const data = req.body;

  delete data.auth_id;
  delete data.user_type;
  delete data._id;
  delete data.email;
  delete data.gender;
  delete data.badge;
  delete data.company_id;
  delete data.company_role;
  delete data.work_history;
  delete data.created_at;
  delete data.__v;
  delete data.notifications;
  delete data.settings;
  delete data.jobs;
  delete data.friend;
  delete data.bio;
  delete data.cover_letter;
  delete data.cv;
  delete data.langauge;
  delete data.account_setup_completed;
  delete data.location;
  delete data.phone_number;
  delete data.skills;
  delete data.experience;
  delete data.education;
  delete data.jobs;
  delete data.hide_detail;
  delete data.ready_to_interview;

  const user = await User.findByIdAndUpdate(req.user._id, data, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    status: 'success',
    data: user
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
  // Extract _job values from req.user.jobs
  const jobIds = req.user.jobs.map((job) => job._job);
  const data = await jobs.find({ _id: { $in: jobIds } });

  res.status(200).json({
    success: true,
    data: data
  });
});

/**
 * @author R. O. Olatunji <larexx40@gmail.com>
 * @description Get User Saved/Applied Jobs `Candidate Account Only`
 * @route `/api/v1/candidate/jobs`
 * @access Private
 * @type GET
 */
exports.getMyJobs = asyncHandler(async (req, res, next) => {
  let { page, limit, jobType } = req.query;
  page = page ? parseInt(page) : 1;
  limit = limit ? parseInt(limit) : 10;

  const skip = (page - 1) * limit;

  // Pipeline for aggregation
  const pipeline = [
    {
      $match: { _id: mongoose.Types.ObjectId(req.user._id) }
    },
    {
      $unwind: '$jobs'
    },
    {
      $lookup: {
        from: 'jobs',
        localField: 'jobs._job',
        foreignField: '_id',
        as: 'jobDetails'
      }
    },
    {
      $addFields: {
        'jobs.jobDetails': { $arrayElemAt: ['$jobDetails', 0] }
      }
    },
    {
      $replaceRoot: {
        newRoot: '$jobs'
      }
    },
    {
      $project: {
        'jobDetails.title': 1,
        'jobDetails.industry': 1,
        'jobDetails.description': 1,
        'jobDetails.requirement': 1,
        'jobDetails.location': 1,
        'jobDetails.salary': 1,
        'jobDetails.type': 1,
        'jobDetails.salaryType': 1,
        'jobDetails.status': 1,
        'jobDetails.promoted': 1,
        'jobDetails.expiry': 1,
        'jobDetails.createdAt': 1,
        state: 1,
        type: 1
      }
    },
    {
      $skip: skip
    },
    {
      $limit: limit
    }
  ];

  // If jobType is provided, add a $match stage to filter by jobType
  if (jobType) {
    pipeline.splice(2, 0, { $match: { 'jobs.type': jobType } });
  }

  // Execute aggregation
  const data = await User.aggregate(pipeline).exec();

  res.status(200).json({
    success: true,
    data: data
  });
});


/**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description Remove a Jobs `Candidate Account Only`
 * @route `/api/v1/candidate/unsave/Job/:id`
 * @access Private
 * @type DELETE
 */
exports.unSaveAJob = asyncHandler(async (req, res, next) => {
  console.log(req.params.id);
  const data = await User.findByIdAndUpdate(
    req.user._id,
    // { $pop: { jobs: {_job: req.params.id} } },
    { $pull: { jobs: { _job: req.params.id, type: UserJobType.SAVED } } },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    status: 'success',
    data: data
  });
});

/**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description Save A New Job `Candidate Account Only`
 * @route `/api/v1/candidate/job/:id`
 * @access Private
 * @type GET
 * @modified_by Timothy
 */
exports.saveAJob = asyncHandler(async (req, res, next) => {
  //TODO  JOI VALIDATOR
  const job = await jobs.exists({ _id: req.params.id });

  if (!job) return res.status(404).json({ success: false, data: null });

  //check if it has already been saved
  const jobSaved = req.user.jobs.find(
    (job) => job._job.toString() === req.params.id
  );
  if (jobSaved && jobSaved.type === UserJobType.SAVED ) {
    return next(new ErrorResponse('User Has Saved This Job Already', 409));
  }

  if (jobSaved && jobSaved.type === UserJobType.APPLIED) {
    return next(new ErrorResponse('User Has Applied For This Job Already', 409));
  }

  const save_job = {
    _job: req.params.id,
    date: new Date(),
    type: UserJobType.SAVED
  };

  const data = await User.findByIdAndUpdate(
    req.user._id,
    { $push: { jobs: save_job } },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    status: 'success',
    data: data
  });
});
