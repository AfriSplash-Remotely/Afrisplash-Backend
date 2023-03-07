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
    input.verify= true
    // save to db
    const data = await Jobs.create([input], opts);
    await data[0].save();

    //Add Job to Company Schema
    await Company.findOneAndUpdate(
      { _id: req.user._id },
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
