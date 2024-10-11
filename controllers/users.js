const asyncHandler = require('../middleware/async');
const User = require('../model/user');
const ErrorResponse = require('../utils/errorResponse');
const firebase = require('../firebase/firebase');
const path = require('path');
const fs = require('fs');
const upload = require('../firebase/upload');

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

/**
 * @author Timothy Adeyeye <adeyeyetimothy33@gmail.com>
 * @description Get User by email
 * @route `/api/v1/users/email/:email
 * @access Public
 * @type GET
 */
exports.getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({
      email: email
    }).select({
      user_type: 1,
      first_name: 1,
      last_name: 1,
      gender: 1,
      email: 1,
      bio: 1,
      profile_image: 1,
      thumbnail: 1,
      language: 1,
      location: 1,
      role: 1,
      work_type: 1,
      phone_number: 1,
      skills: 1,
      experience: 1,
      education: 1,
      ready_to_interview: 1,
      work_history: 1
    });

    if (user === null) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found'
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'User details retrieved successfully',
      data: user
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred',
      erorr: error.message
    });
  }
};

/**
 * @author Timothy Adeyeye <adeyeyetimothy33@gmail.com>
 * @description Upload image file to storage
 * @route `/api/v1/users/upload
 * @access Public
 * @type GET
 */
exports.uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No file'
    });
  }

  const buffer = req.file.buffer;
  const mimetype = req.file.mimetype;

  const uploadResponse = await upload(buffer, mimetype);

  if (!uploadResponse.status) {
    return res.status(500).json({
      success: false,
      message: 'Failed to upload image',
      error: uploadResponse.error
    });
  }

  return res.status(200).json({
    success: true,
    url: uploadResponse.data
  });
};
