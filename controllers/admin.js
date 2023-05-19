const Permission = require('../model/permission');
const Admin = require('../model/admin');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const { validateAdminInvite } = require('../middleware/validators');

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
    if (error.code === 11000)
      return next(new ErrorResponse('Email already exist', 409));

    return next(new ErrorResponse('An error occured.', 500));
  }
});
