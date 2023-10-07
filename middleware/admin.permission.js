const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const Admin = require('../model/admin');

/**
 * Permission guard for Blog access
 */
exports.B_permission = asyncHandler(async (req, res, next) => {
  const name = 'blog_access';
  const message = 'Permission denied. You do not have blog access.';
  await operations(req, res, next, name, message);
});

/**
 * Permission guard for Forum access
 */
exports.F_permission = asyncHandler(async (req, res, next) => {
  const name = 'forum_access';
  const message = 'Permission denied. You do not have forum access.';
  await operations(req, res, next, name, message);
});

/**
 * Permission guard for Job access
 */
exports.F_permission = asyncHandler(async (req, res, next) => {
  const name = 'job_access';
  const message = 'Permission denied. You do not have job access.';
  await operations(req, res, next, name, message);
});

/**
 * Permission guard for Deals access
 */
exports.F_permission = asyncHandler(async (req, res, next) => {
  const name = 'deals_access';
  const message = 'Permission denied. You do not have deals access.';
  await operations(req, res, next, name, message);
});

// *****************HELPER FUNCTION**************
const operations = async (req, res, next, name, message) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token)
    return next(new ErrorResponse('Not authorized: Empty token', 401));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Admin.findById(decoded.id).populate('permissions');

    const permissions = user.permissions;
    for (let i = 0; i < permissions.length; i++) {
      const permission = permissions[i];
      if (permission.name === name) {
        req.user = user;
        return next();
      }
    }

    return res.status(403).json({ error: message });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server' });
  }
};
