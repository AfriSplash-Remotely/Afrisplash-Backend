const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const mongoose = require('mongoose');
const joi = require('joi');
const Jobs = require('../model/jobs');
const Company = require('../model/companies');
const User = require('../model/user');
const _ = require('lodash');

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
    if (!req.user._company) {
      return next(new ErrorResponse('Company Is Required', 400));
    }

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

  // check if User is Asscoited with the company
  if (req.user._company !== jobOld._company) {
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
    return next(new ErrorResponse('No User Found', 404));
  }
  // check if User is Asscoited with the company
  if (req.user._company !== jobOld._company) {
    return next(new ErrorResponse('Not Authorize', 401));
  }

  const job = await Jobs.findOneAndDelete({ _id: req.params.id });

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
  const jobs = await Jobs.find({ _company: req.user._company });
  res.status(200).json({
    success: true,
    data: jobs
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
  const jobs = await Jobs.findOne({
    _company: req.user._company,
    _id: req.params.id
  });
  res.status(200).json({
    success: true,
    data: jobs
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
  });
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

  // check if User is Asscoited with the company
  if (req.user._company !== jobOld._company) {
    return next(new ErrorResponse('Not Authorize', 401));
  }

  // check if User is Asscoited with the company
  if (!jobOld._company.publish) {
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

  // check if User is Asscoited with the company
  if (req.user._company !== jobOld._company) {
    return next(new ErrorResponse('Not Authorize', 401));
  }

  // check if User is Asscoited with the company
  if (jobOld._company.publish) {
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
