const asyncHandler = require('../middleware/async');
const User = require('../model/user');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @author Timothy Adeyeye <adeyeyetimothy33@gmail.com>
 * @description Get all candidates
 * @route `/api/v1/users/candidates
 * @access Public
 * @type GET
 */
exports.getAllCandidates = asyncHandler(async (req, res, next) => {
  try {
    const candidates = await User.find({
      user_type: 'candidate',
      account_setup_completed: true,
      private_mode: false
    }).select({
      _id: 1,
      auth_id: 1,
      first_name: 1,
      last_name: 1,
      email: 1,
      profile_image: 1,
      thumbnail: 1,
      language: 1,
      location: 1,
      skills: 1,
      role: 1,
      availability: 1,
      badge: 1,
      ready_to_interview: 1
    });

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 30;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = candidates.length;

    const queryResult = candidates.slice(startIndex, endIndex);

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
    // TODO: logger
    return next(new ErrorResponse('An error occurred', 500));
  }
});

/**
 * @author Timothy Adeyeye <adeyeyetimothy33@gmail.com>
 * @description Get User by id
 * @route `/api/v1/users/:id`
 * @access Private - Admin
 * @type GET
 */
exports.getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    _id: id
  }).select({
    auth_id: 0
  });

  return res.status(200).json({
    success: true,
    data: user
  });
});
