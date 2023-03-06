const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const mongoose = require('mongoose');
const joi = require('joi');
const Company = require('../model/companies');
const User = require('../model/user');
const _ = require('lodash');
const Jobs = require('../model/jobs');
/**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description Create A New Company
 * @route `/api/v1/company/create`
 * @access Private
 * @type POST
 */
exports.create = asyncHandler(async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session, new: true };
    const input = req.body;
    let name = req.body.name;
    let role = req.body.role;
    let email = req.body.company_email;
    //check
    if (!name) {
      return next(new ErrorResponse('Company Name Is Required', 400));
    }
    if (!email) {
      return next(new ErrorResponse('Company Email Is Required', 400));
    }
    if (!role) {
      return next(new ErrorResponse('Your Role Is Required', 400));
    }
    // reduce to lowercase
    name = name.toLowerCase();
    email = email.toLowerCase();
    //added user ID
    input.created_by = req.user._id;

    const checkName = await Company.findOne({
      email: req.body.company_email,
      name: req.body.name
    });
    // if compay exist
    if (!_.isEmpty(checkName)) {
      return next(
        new ErrorResponse(
          'Company already exist, If You have an Issues Reach Support',
          400
        )
      );
    }
    // TODO Validator
    const data = await Company.create([input], opts);
    await data[0].save();
    await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        _company: data[0]._id,
        company_role: input.role // gotten from inputs
      },
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
 * @description Get All Company Both Verified Or Not
 * @route `/api/v1/company/`
 * @access Public
 * @type GET
 */
exports.getCompanies = asyncHandler(async (req, res, next) => {
  //   const data = await Company.find({}).sort({ _id: -1 }).select({
  //     name: 1,
  //     logo: 1,
  //     thumbnail: 1,
  //     location: 1,
  //     market: 1,
  //     one_Line_Pitch: 1,
  //     verified: 1,
  //     staff: 1,
  //     _id: 1
  //   });
  //   res.status(200).json({
  //     success: true,
  //     data: data
  //   });
  res.status(200).json(res.advancedResults);
});

/**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description Get Only Verified Company
 * @route `/api/v1/company/verified`
 * @access Public
 * @type GET
 */
exports.getVCompanies = asyncHandler(async (req, res, next) => {
  const data = await Company.find({ verified: true }).sort({ _id: -1 }).select({
    name: 1,
    logo: 1,
    thumbnail: 1,
    location: 1,
    market: 1,
    one_Line_Pitch: 1,
    verified: 1,
    staff: 1,
    _id: 1
  });
  res.status(200).json({
    success: true,
    data: data
  });
});

/**
 * @author Cyril Ogoh <cyrilogoh@gmail.com>
 * @description to delete a Company
 * @route `/api/v1/company/:company`
 * @access Private
 * @type DELETE
 */
exports.deleteCompany = asyncHandler(async (req, res, next) => {
  await Company.findOneAndDelete({ _id: req.params.company });

  await User.updateMany(
    {
      _company: req.params.company
    },
    {
      _company: null,
      company_role: ''
    }
  );
  // Remove Jobs from Company
  await Jobs.deleteMany({
    _company: req.params.company
  });
  res.status(200).json({
    success: true,
    data: {}
  });
});

/**
 * @author Cyril Ogoh <cyrilogoh@gmail.com>
 * @description to Edit a Company Details
 * @route `/:id`
 * @access Private
 * @type PUT
 */
exports.editCompany = asyncHandler(async (req, res, next) => {
  const data = req.body;
  delete data._id;
  delete data.verified;
  delete data.created_by;

  const company = await Company.findByIdAndUpdate(req.params.id, data, {
    new: false,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    status: 'success',
    data: company
  });
});

/**
 * @author Cyril Ogoh <cyrilogoh@gmail.com>
 * @description to Verify a Company Details
 * @route `/verify`
 * @access Private
 * @type PUT
 */
exports.verifyCompany = asyncHandler(async (req, res, next) => {
  const { id } = req.body;

  const company = await Company.findByIdAndUpdate(
    id,
    {
      verified: true
    },
    {
      new: false,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    status: 'success',
    data: {
      message: 'Company Verify Successful'
    }
  });
});
