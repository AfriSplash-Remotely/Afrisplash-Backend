const Report = require('../model/report');
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
      reporter_id: req.user._id,
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
