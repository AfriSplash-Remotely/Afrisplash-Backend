const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const Admin = require('../model/admin');

/**
 * Permission guard for blog access
 */
exports.B_permission = asyncHandler(async (req, res, next) => {
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
      if (permission.name === 'blog_access') {
        req.user = user;
        return next();
      }
    }

    return res
      .status(403)
      .json({ error: 'Permission denied. You do not have blog access.' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server' });
  }
});
