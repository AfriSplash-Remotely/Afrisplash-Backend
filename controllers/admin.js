const bcrypt = require('bcryptjs');
const Permission = require('../model/permission');
const Admin = require('../model/admin');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const {
  validateAdminInvite,
  validateAdminLogin
} = require('../middleware/validators');

/**
 * @author Timothy Adeyeye <adeyeyetimothy33@gmail.com>
 * @description Invite/Create Admin user
 * @route `/api/v1/admin/invite
 * @access Restricted
 * @type POST
 */
exports.inviteAdmin = asyncHandler(async (req, res, next) => {
  try {
    // Validate the request body
    const { error, value } = validateAdminInvite(req.body);

    if (error) return res.status(400).send(error.details);

    let { email, password, permissions } = value;

    // create the admin user
    const adminUser = new Admin({
      email,
      password
    });

    // retrieve permission documents
    for (let i = 0; i < permissions.length; i++) {
      const permission = permissions[i];
      const permissionAccess = await Permission.findOne({
        name: permission
      });

      // add the permission to the admin user
      if (permissionAccess) adminUser.permissions.push(permissionAccess);
    }

    // save the admin user
    await adminUser.save();

    // TODO Send Verification Mail to Update Password

    return res.status(201).json(adminUser);
  } catch (error) {
    console.log(error);
    if (error.code === 11000)
      return next(new ErrorResponse('Email already exist', 409));

    return next(new ErrorResponse('An error occured.', 500));
  }
});

/**
 * @author Timothy Adeyeye <adeyeyetimothy33@gmail.com>
 * @description Admin user login
 * @route `/api/v1/admin/login
 * @access Public
 * @type POST
 */
exports.login = asyncHandler(async (req, res, next) => {
  try {
    // validate the request body
    const { error, value } = validateAdminLogin(req.body);

    if (error) return res.status(400).send(error.details);

    const { email, password } = value;

    // find the admin user
    const admin = await Admin.findOne({ email }).populate('permissions');

    // if user does not exist
    if (!admin) return next(new ErrorResponse('User does not exist', 404));

    // check if password matches
    const isMatch = await bcrypt.compare(password, admin.password);

    // if password no match
    if (!isMatch) return next(new ErrorResponse('Password incorrect', 401));

    // create JWT
    const token = admin.getSignedJwtToken();
    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') options.secure = true;

    return res.status(200).cookie('token', token, options).json({
      success: true,
      token,
      data: admin
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse('An error occurred', 500));
  }
});
