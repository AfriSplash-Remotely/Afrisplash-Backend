const Report = require('../model/report');
const Post = require('../model/post');
const User = require('../model/user');
const Compnay = require('../model/companies');
const Job = require('../model/jobs');
const Comment = require('../model/comment');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const { validateReportSchema } = require('../middleware/validators');

/**
 * @author Timothy Adeyeye <adeyeyetimothy33@gmail.com>
 * @description Create a report
 * @route `/api/v1/reports
 * @access Restricted
 * @type POST
 */
exports.createReport = asyncHandler(async (req, res, next) => {
  try {
    // validate the request body
    const { error, value } = validateReportSchema(req.body);

    if (error) return res.status(400).send(error.details);

    const { reported_item, reason, type } = value;

    // create report document
    const newReport = new Report({
      reporter: req.user._id,
      reported_item,
      type,
      reason
    });

    // save the report
    await newReport.save();

    return res.status(201).json(newReport);
  } catch (error) {
    return next(new ErrorResponse('An error occured.', 500));
  }
});

/**
 * @author Timothy Adeyeye <adeyeyetimothy33@gmail.com>
 * @description Get all reports
 * @route `/api/v1/reports
 * @access Restricted
 * @type GET
 */
exports.getReports = asyncHandler(async (req, res, next) => {
  try {
    const reports = await Report.find().populate('reporter', {
      _id: 1,
      email: 1,
      user_type: 1,
      email: 1,
      first_name: 1,
      last_name: 1
    });

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 30;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = reports.length;

    const queryResult = reports.slice(startIndex, endIndex);

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
    console.log(error);
    //TODO: logger
    return next(new ErrorResponse('An error occurred', 500));
  }
});

/**
 * @author Timothy Adeyeye <adeyeyetimothy33@gmail.com>
 * @description Get a report
 * @route `/api/v1/report/:id
 * @access Restricted
 * @type GET
 */
exports.getReport = asyncHandler(async (req, res, next) => {
  try {
    let report = await Report.findById(req.params.id).populate('reporter', {
      _id: 1,
      email: 1,
      user_type: 1,
      email: 1,
      first_name: 1,
      last_name: 1
    });

    if (!report) return next(new ErrorResponse('Report Not Found', 404));

    const type = report.type;
    let reported_item_data;
    const reported_item_id = report.reported_item;

    if (type === 'post') {
      const query = await Post.findById(reported_item_id, {
        _id: 1,
        title: 1
      });
      reported_item_data = query.toObject();
    } else if (type === 'user') {
      const query = await User.findById(reported_item_id, {
        _id: 1,
        user_type: 1,
        first_name: 1,
        last_name: 1,
        email: 1,
        gender: 1
      });
      reported_item_data = query.toObject();
    } else if (type === 'company') {
      const query = await Compnay.findById(reported_item_id, {
        _id: 1,
        name: 1,
        one_Line_Pitch: 1
      });
      reported_item_data = query.toObject();
    } else if (type === 'job') {
      const query = await Job.findById(reported_item_id, {
        _id: 1,
        title: 1,
        industry: 1,
        experience: 1,
        type: 1,
        status: 1,
        location: 1,
        salary: 1
      });
      reported_item_data = query.toObject();
    } else if (type === 'comment') {
      const query = await Comment.findById(reported_item_id, {
        _id: 1,
        body: 1
      });
      reported_item_data = query.toObject();
    } else {
      //
    }

    let data = report.toObject();
    data.reported_item = reported_item_data;

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    //TODO: logger
    return next(new ErrorResponse('An error occurred', 500));
  }
});
