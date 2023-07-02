const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const mongoose = require('mongoose');
const joi = require('joi');
const Jobs = require('../model/jobs');
const Company = require('../model/companies');
const User = require('../model/user');
const _ = require('lodash');
const { validateJobStatus } = require('../middleware/validators');

/**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description Ping Server
 * @route `/api/v1/jobs/pings`
 * @access Public
 * @type GET
 */
exports.ping = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: 'Ping From Jobs'
  });
});

/**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description Create A New Job Under a Company
 * @route `/api/v1/jobs/create`
 * @access Private
 * @type POST
 */
exports.create = asyncHandler(async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session, new: true };
    const input = req.body;
    if (!req.user._company) {
      return next(new ErrorResponse('Company Is Required', 400));
    }

    let expiry = 30; // default expiry days
    if (input.expiry) expiry = input.expiry; // set expiry day from user if provided

    // calculate expiry date
    const currentDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(currentDate.getDate() + expiry);

    // set expiry date
    input.expiry = expiryDate;

    input._company = req.user._company;
    input._author = req.user._id;
    input.verify = true;
    // save to db
    const data = await Jobs.create([input], opts);
    await data[0].save();

    //Add Job to Company Schema
    await Company.findOneAndUpdate(
      { _id: req.user._company },
      { $push: { jobs: data[0]._id } },
      { new: true, runValidators: true, session: session }
    );

    await session.commitTransaction();
    session.endSession();
    res.status(201).json({
      success: true,
      data: data
    });
  } catch (error) {
    session.endSession();
    next(error);
  }
});

/**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description  Edit A Job
 * @route `/api/v1/jobs/e/:id`
 * @access Private
 * @type PUT
 */
exports.updateJob = asyncHandler(async (req, res, next) => {
  const data = req.body;

  delete data._company;
  delete data._author;
  delete data.promoted;
  delete data.publish;
  delete data.verify;

  const jobOld = await Jobs.findOne({ _id: req.params.id });

  if (!jobOld) {
    return next(new ErrorResponse('No Job Found', 404));
  }
  // check if User is Asscoited with the company
  if (req.user._company.toString() !== jobOld._company.toString()) {
    return next(new ErrorResponse('Not Authorize', 401));
  }

  const job = await Jobs.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    status: 'success',
    data: job
  });
});

/**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description  Delete a Job
 * @route `/api/v1/jobs/d/:id`
 * @access Private
 * @type DELETE
 */
exports.delJob = asyncHandler(async (req, res, next) => {
  const jobOld = await Jobs.findOne({ _id: req.params.id });

  if (!jobOld) {
    return next(new ErrorResponse('No Resource Found', 404));
  }
  // check if User is Asscoited with the company
  if (req.user._company.toString() !== jobOld._company.toString()) {
    return next(
      new ErrorResponse('Not Authorize, Can Not Perform Action', 401)
    );
  }

  const job = await Jobs.findOneAndDelete({ _id: req.params.id });
  await Company.updateOne(
    { _id: req.user._company },
    {
      $pull: {
        jobs: jobOld._id
      }
    }
  );
  res.status(200).json({
    success: true,
    status: 'success',
    data: job
  });
});

/**
 * @author Cyril Ogoh <cyrilogoh@gmail.com>
 * @description Get All Jobs Post By Company
 * @route `/api/v1/jobs/p`
 * @access Private
 * @type GET
 */
exports.getMyJobs = asyncHandler(async (req, res, next) => {
  let query;
  const reqQuery = { ...req.query };
  const removeFields = ['select', 'sort', 'page', 'limit'];
  removeFields.forEach((param) => delete reqQuery[param]);
  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  queryStr._company = req.user._company;

  query = Jobs.find(JSON.parse(queryStr));
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Jobs.find({
    _company: req.user._company
  }).countDocuments();
  query = query.skip(startIndex).limit(limit);

  query = query.populate('_author', {
    first_name: 1,
    last_name: 1,
    profile_image: 1,
    thumbnail: 1,
    bio: 1
  });

  const results = await query;
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.status(200).json({
    success: true,
    status: 'success',
    count: results.length,
    pagination,
    data: results
  });
});

/**
 * @author Cyril Ogoh <cyrilogoh@gmail.com>
 * @description Get a Jobs Post By Company
 * @route `/api/v1/jobs/p/:id`
 * @access Private
 * @type GET
 */
exports.getMyJob = asyncHandler(async (req, res, next) => {
  const job = await Jobs.findOne({
    _company: req.user._company,
    _id: req.params.id
  })
    .populate('_company', { logo: 1, name: 1, thumbnail: 1 })
    .populate('_author', {
      first_name: 1,
      last_name: 1,
      profile_image: 1,
      thumbnail: 1,
      bio: 1
    });

  // check if Job Is Close
  if (!job) {
    return next(new ErrorResponse('No Job Found', 404));
  }

  res.status(200).json({
    success: true,
    data: job
  });
});

/**
 * @author Cyril Ogoh <cyrilogoh@gmail.com>
 * @description Get All Jobs Post Active And Public
 * @route `/api/v1/jobs/`
 * @access PUBLIC
 * @type GET
 */
exports.getJobs = asyncHandler(async (req, res, next) => {
  const jobs = await Jobs.find({
    verify: true,
    private: false,
    publish: true
  })
    .populate('_company', { logo: 1, name: 1, thumbnail: 1 })
    .populate('_author', {
      first_name: 1,
      last_name: 1,
      profile_image: 1,
      thumbnail: 1,
      bio: 1
    })
    .select({
      applicants: 0
    });

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = jobs.length;

  const query = jobs.slice(startIndex, endIndex);

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.status(200).json({
    success: true,
    status: 'success',
    total: total,
    count: query.length,
    pagination,
    data: query
  });
});

/**
 * @author Cyril Ogoh <cyrilogoh@gmail.com>
 * @description Get a Jobs Post Active And Public
 * @route `/api/v1/jobs/v/:id`
 * @access PUBLIC
 * @type GET
 */
exports.getJob = asyncHandler(async (req, res, next) => {
  const jobs = await Jobs.findOne({
    verify: true,
    private: false,
    publish: true,
    _id: req.params.id
  })
    .populate('_company', { logo: 1, name: 1, thumbnail: 1 })
    .populate('_author', {
      first_name: 1,
      last_name: 1,
      profile_image: 1,
      thumbnail: 1,
      bio: 1
    });

  // check if Job Is Close
  if (!jobs) {
    return next(new ErrorResponse('No Job Found', 404));
  }
  res.status(200).json({
    success: true,
    data: jobs
  });
});

/**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description  Close A Job
 * @route `/api/v1/jobs/c/:id`
 * @access Private
 * @type PUT
 */
exports.closeJob = asyncHandler(async (req, res, next) => {
  const jobOld = await Jobs.findOne({ _id: req.params.id });

  // check if Job Is Close
  if (!jobOld) {
    return next(new ErrorResponse('No Job Found', 404));
  }

  // check if User is Asscoited with the company
  if (req.user._company.toString() !== jobOld._company.toString()) {
    return next(new ErrorResponse('Not Authorize', 401));
  }

  // check if Job Is Close
  if (!jobOld.publish) {
    return next(new ErrorResponse('Job is already Close', 400));
  }

  const job = await Jobs.findByIdAndUpdate(
    req.params.id,
    {
      publish: false
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    status: 'success',
    data: job
  });
});

/**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description  Open A Job
 * @route `/api/v1/jobs/o/:id`
 * @access Private
 * @type PUT
 */
exports.openJob = asyncHandler(async (req, res, next) => {
  const jobOld = await Jobs.findOne({ _id: req.params.id });

  // check if Job Is Close
  if (!jobOld) {
    return next(new ErrorResponse('No Job Found', 404));
  }

  // check if User is Asscoited with the company
  if (req.user._company.toString() !== jobOld._company.toString()) {
    return next(new ErrorResponse('Not Authorize', 401));
  }

  // check if User is Asscoited with the company
  if (jobOld.publish) {
    return next(new ErrorResponse('Job is already Open', 400));
  }

  const job = await Jobs.findByIdAndUpdate(
    req.params.id,
    {
      publish: true
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    status: 'success',
    data: job
  });
});

/**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description Get All User That Applied
 * @route `/api/v1/applicants/:id`
 * @access Private
 * @type GET
 */
exports.getApplicants = asyncHandler(async (req, res, next) => {
  let job = Jobs.findOne({ _id: req.params.id });

  // Populate
  job = job.populate('applicants._user', {
    email: 1,
    bio: 1,
    first_name: 1,
    _id: 0,
    last_name: 1,
    profile_image: 1,
    thumbnail: 1,
    badge: 1
  });

  const results = await job;
  //   check if User is Asscoited with the company
  if (req.user._company.toString() !== results._company.toString()) {
    return next(new ErrorResponse('Not Authorize', 401));
  }

  res.status(200).json({
    success: true,
    status: 'success',
    data: results.applicants
  });
});

/**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description Applied For A New Job `Candidate Account Only`
 * @route `/api/v1/job/a/:id`
 * @access Private
 * @type GET
 */
exports.applyJob = asyncHandler(async (req, res, next) => {
  // Check if user hasnt applied before

  if (req.user.jobs.some((j) => j._job.toString() === req.params.id)) {
    return next(
      new ErrorResponse('User Has Applied For This Job Already', 409)
    );
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Add data to job
    await Jobs.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          applicants: {
            _user: req.user._id,
            date: Date.now(),
            rejected: false,
            accpected: false
          }
        }
      },
      { new: true, runValidators: true, session: session }
    );

    // add data to user
    await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $push: {
          jobs: {
            _job: req.params.id,
            date: Date.now(),
            state: 'pending'
          }
        }
      },
      { new: true, runValidators: true, session: session }
    );

    await session.commitTransaction();
    session.endSession();
    //TODO: SEND NOTIFICATION
    res.status(200).json({
      success: true,
      status: 'success'
    });
  } catch (error) {
    session.endSession();
    return next(error);
  }

  res.end();
});

/**
 * @author Timothy Adeyeye <adeyeyetimothy33@gmail.com>
 * @description Change the status of a job
 * @route `/api/v1/jobs/:id/status`
 * @access Private
 * @type PATCH
 */
exports.updateStatus = asyncHandler(async (req, res, next) => {
  try {
    // validate the request body
    const { error, value } = validateJobStatus(req.body);
    if (error) return res.status(400).send(error.details);

    const job = await Jobs.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status
      },
      { new: true }
    ).populate('_company', {
      _id: true,
      name: true
    });

    if (!job) return next(new ErrorResponse('Job not found', 404));

    return res.status(200).json({
      success: true,
      status: 'success',
      data: job
    });
  } catch (error) {
    return next(error);
  }
});

/**
 * @author Timothy Adeyeye <adeyeyetimothy33@gmail.com>
 * @description Get all jobs by a particular company
 * @route `/api/v1/jobs/:company
 * @access Public
 * @type GET
 */
exports.jobsByCompany = asyncHandler(async (req, res, next) => {
  try {
    const { company } = req.params;

    // get company
    const companyId = await Company.findOne({
      name: company
    }).select({
      id: 1
    });

    let jobs = [];

    if (companyId) {
      // get jobs
      jobs = await Jobs.find({
        _company: companyId._id
      });
    }

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 30;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = jobs.length;

    const queryResult = jobs.slice(startIndex, endIndex);

    const pagination = {};

    if (endIndex < total)
      pagination.next = {
        page: page + 1,
        limit
      };

    if (startIndex > 0)
      pagination.prev = {
        page: page - 1,
        limit
      };

    return res.status(200).json({
      success: true,
      status: 'success',
      total,
      count: queryResult.length,
      pagination,
      data: queryResult
    });
  } catch (error) {
    return next(error);
  }
});

/**
 * @author Timothy Adeyeye <adeyeyetimothy33@gmail.com>
 * @description Search jobs by Type
 * @route `/api/v1/jobs/:type
 * @access Public
 * @type GET
 */
exports.jobsByType = asyncHandler(async (req, res, next) => {
  try {
    const { type } = req.params;

    if (!['Onsite', 'Remote', 'Hybrid'].includes(type)) {
      return res.status(400).json({
        success: false,
        status: error,
        message: 'Job type can only be any of [Onsite, Remote, Hybrid]'
      });
    }

    // find jobs
    const jobs = await Jobs.find({
      type: type
    });

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 30;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = jobs.length;

    const queryResult = jobs.slice(startIndex, endIndex);

    const pagination = {};

    if (endIndex < total)
      pagination.next = {
        page: page + 1,
        limit
      };

    if (startIndex > 0)
      pagination.prev = {
        page: page - 1,
        limit
      };

    return res.status(200).json({
      success: true,
      status: 'success',
      total,
      count: queryResult.length,
      pagination,
      data: queryResult
    });
  } catch (error) {
    return next(error);
  }
});
