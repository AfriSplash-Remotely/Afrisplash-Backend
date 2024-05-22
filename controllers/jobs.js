const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const mongoose = require('mongoose');
const joi = require('joi');
const Jobs = require('../model/jobs');
const Company = require('../model/companies');
const User = require('../model/user');
const _ = require('lodash');
const {
  validateJobStatus,
  validateJobTimeRange,
  validateCreateJob,
  joiErrorMessage,
  validateApplyJobSchema
} = require('../middleware/validators');
const { UserJobType } = require('../utils/enum');

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

    const { error, value } = validateCreateJob(input);
    console.log('Error:', error);
    if (error) return res.status(400).send(errorMessage);

    let expiry = input.expiry ? input.expiry : 30; // default expiry days
    // calculate expiry date
    const currentDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(currentDate.getDate() + expiry);

    // set expiry date
    input.expiry = expiryDate;

    if (input.salary && input.salary.min && input.salary.max) {
      const minSalary = input.salary.min > 0 ? input.salary.min : 0;
      const maxSalary = input.salary.max > 0 ? input.salary.max : 0;
      if (input.minSalary >= input.maxSalary) {
        return next(
          new ErrorResponse(
            `Minimum salary should be less than maximum salary`,
            400
          )
        );
      }
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
 * @type PATCH
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
      new ErrorResponse('Not Authorized, Can Not Perform Action', 401)
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

  return res.status(200).json({
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
 * @type Patch
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
    return next(new ErrorResponse('Job is already Closed', 400));
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
 * @type Patch
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
    return next(new ErrorResponse('Not Authorized', 401));
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
 * @type POST
 */
exports.applyJob = asyncHandler(async (req, res, next) => {
  const isExist = await Jobs.exists({ _id: req.params.id });
  if (!isExist) return res.status(404).json({ success: false, data: null });
  // Check if user hasnt applied before
  const job = req.user.jobs.find(
    (job) => job._job.toString() === req.params.id
  );
  if (job && job.type === UserJobType.APPLIED) {
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
            accepted: false
          }
        }
      },
      { new: true, runValidators: true, session: session }
    );

    //check if user has saved the job, then change to apply
    if (job && job.type === UserJobType.SAVED) {
      await User.findOneAndUpdate(
        { _id: req.user._id, 'jobs._job': req.params.id },
        {
          $set: {
            jobs: {
              _job: req.params.id,
              type: UserJobType.APPLIED,
              date: Date.now()
            }
          }
        },
        { new: true, runValidators: true, session: session }
      );
    } else {
      // add data to user
      await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            jobs: {
              _job: req.params.id,
              date: Date.now(),
              type: UserJobType.APPLIED,
              state: 'pending'
            }
          }
        },
        { new: true, runValidators: true, session: session }
      );
    }

    await session.commitTransaction();
    session.endSession();
    //TODO: SEND NOTIFICATION
    res.status(200).json({
      success: true,
      status: 'success',
      message: 'Job Applied'
    });
  } catch (error) {
    session.endSession();
    return next(error);
  }

  res.end();
});

/**
 * @author Timothy <adeyeyetimothy33@gmail.com>
 * @description Applied For A Job through form`
 * @route `/api/v1/job/form-apply/:id`
 * @access Public
 * @type POST
 */
exports.formJobApply = async (req, res) => {
  try {
    const { error, value } = validateApplyJobSchema(req.body);
    if (error) return res.status(400).send(errorMessage);

    const jobId = req.params.jobId;
    const job = await Jobs.findById(jobId).select({
      external_applicants: 1
    });
    if (!job)
      return res
        .status(404)
        .json({ status: 'fail', message: 'Job no longer exists' });

    const applicants = job.external_applicants;
    // check if appliant already exists
    applicants.forEach((applicant) => {
      if (applicant.email === req.body.email) {
        return res.status(409).json({
          status: 'false',
          message: 'User already applied for this job'
        });
      }
    });

    // apply for job
    await Jobs.findOneAndUpdate(
      { _id: jobId },
      {
        $push: {
          external_applicants: { ...value }
        }
      }
    );

    // TODO: Send email notification
    return res
      .status(200)
      .json({ status: 'success', message: 'Application sent successfully' });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Unable to send application',
      error: error
    });
  }
};

/**
 * @author Timothy <adeyeyetimothy33@gmail.com>
 * @description Get applicants that applied through form`
 * @route `/api/v1/job/form-applicants/:id`
 * @access Private
 * @type GET
 */
exports.formJobApplicants = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const applicants = await Jobs.findById(jobId).select({
      _id: 0,
      external_applicants: 1
    });

    if (applicants === null)
      return res.status(404).json({ status: 'fail', message: 'Job not found' });

    return res.status(200).json({
      status: 'success',
      message: 'Job form applicants retrieved successfully',
      data: applicants
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred while retrieving applicants',
      error: error
    });
  }
};

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
 * @route /api/v1/jobs/search/c/:company
 * @access Public
 * @type GET
 */
exports.jobsByCompany = asyncHandler(async (req, res, next) => {
  try {
    const { company } = req.params;

    // Use a case-insensitive regular expression for the search
    const regex = new RegExp(company, 'i');

    // get company
    const companyId = await Company.findOne({
      name: regex
    }).select({
      id: 1
    });
    console.log('Company ID found', companyId);

    let jobs = [];

    if (companyId) {
      // get jobs
      jobs = await Jobs.find({
        _company: companyId._id,
        status: 'Active'
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
 * @route /api/v1/jobs/search/t/:type
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
      type: type,
      status: 'Active'
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

/**
 * @author Timothy Adeyeye <adeyeyetimothy33@gmail.com>
 * @description Search jobs by Location
 * @route /api/v1/jobs/search/l/:location
 * @access Public
 * @type GET
 */
exports.jobsByLocation = asyncHandler(async (req, res, next) => {
  try {
    const { location } = req.params;

    // find jobs
    const jobs = await Jobs.find({
      location: location,
      status: 'Active'
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

/**
 * @author Timothy Adeyeye <adeyeyetimothy33@gmail.com>
 * @description Search jobs by Date
 * @route /api/v1/jobs/search/d/:date
 * @access Public
 * @type GET
 */
exports.jobsByDate = asyncHandler(async (req, res, next) => {
  const { timeRange } = req.query;
  // validate the request query
  const { error, value } = validateJobTimeRange(req.query);
  if (error) return res.status(400).send(error.details);

  let startDate;

  // set the start date based on the desired time range
  if (timeRange === 'past24hours') {
    startDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
  } else if (timeRange === 'pastweek') {
    startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  } else if (timeRange === 'pastmonth') {
    startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  } else if (timeRange === 'anytime') {
    startDate = null;
  }

  try {
    let jobs;

    if (startDate) {
      // search for jobs created after the start date
      jobs = await Jobs.find({
        createdAt: {
          $gte: startDate
        }
      });
    } else {
      // return all jobs that are active
      jobs = await Jobs.find({
        status: 'Active'
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
 * @author R. O. Olatunji <larexx40@gmail.com>
 * @description Search jobs by salary
 * @route /api/v1/jobs/search/s/:salary
 * @access Public
 * @type GET
 */
exports.jobsBySalary = asyncHandler(async (req, res, next) => {
  try {
    const { salary } = req.params;
    const { page, limit } = req.query;

    // Parse salary to integer or range object
    let salaryFilter;
    let query;
    // if (salary.includes('-')) {
    //   const [min, max] = salary.split('-').map((s) => parseInt(s));
    //   salaryFilter = { min, max };
    // } else {
    //   salaryFilter = parseInt(salary);
    // }
    if (isNaN(salaryFilter)) {
      return res.status(400).json({
        success: false,
        status: 'validation error',
        message: 'Pass in valid salary amount/range'
      });
    }

    query = {
      $or: [
        { 'salary.amount': salaryFilter }, // For fixed salary
        {
          $and: [
            // For salary range
            { 'salary.min': { $lte: salaryFilter } },
            { 'salary.max': { $gte: salaryFilter } }
          ]
        }
      ],
      status: 'Active' // Only active jobs
    };

    // // Construct query based on salary filter
    // if(typeof salaryFilter === 'object' && salaryFilter !== null ){
    //   console.log('salary:', salaryFilter);
    //   if(isNaN(salaryFilter.min) || isNaN(salaryFilter.max) ){
    //     return res.status(400).json({
    //       success: false,
    //       status: 'validation error',
    //       message: 'Pass in valid salary range e.g 2000-4000'
    //     });
    //   }

    //   if(!(salaryFilter.max > salaryFilter.min)){
    //     return res.status(400).json({
    //       success: false,
    //       status: 'validation error',
    //       message:
    //         'Please provide a valid salary range. The maximum value should be greater than the minimum value.'
    //     });
    //   }

    //   query = {
    //     $or: [
    //       { 'salary.amount': {$lte: salaryFilter.max,$gte: salaryFilter.min } }, // For fixed salary
    //       {
    //         $and: [
    //           // For salary range
    //           { 'salary.min': { $lte: salaryFilter.min } },
    //           { 'salary.max': { $gte: salaryFilter.max } }
    //         ]
    //       }
    //     ],
    //     status: 'Active' // Only active jobs
    //   };
    // }

    // Find jobs
    const jobs = await Jobs.find(query);

    // Pagination
    const pageInt = parseInt(page, 10) || 1;
    const limitInt = parseInt(limit, 10) || 30;
    const startIndex = (pageInt - 1) * limitInt;
    const endIndex = pageInt * limitInt;
    const total = jobs.length;

    const queryResult = jobs.slice(startIndex, endIndex);

    const pagination = {};

    if (endIndex < total)
      pagination.next = {
        page: pageInt + 1,
        limit: limitInt
      };

    if (startIndex > 0)
      pagination.prev = {
        page: pageInt - 1,
        limit: limitInt
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
