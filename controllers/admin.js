const bcrypt = require('bcryptjs');
const Permission = require('../model/permission');
const Admin = require('../model/admin');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const {
  validateAdminInvite,
  validateAdminLogin,
  validateSendEmail
} = require('../middleware/validators');
const emailSender = require('../mail/emailSender');
const generateRandomPassword = require('../utils/randomPasswordGen');
const { default: mongoose } = require('mongoose');
const auth = require('../model/auth');

/**
 * @author Timothy Adeyeye <adeyeyetimothy33@gmail.com>
 * @description Invite/Create Admin user
 * @route `/api/v1/admins/invite
 * @access Restricted
 * @type POST
 */
exports.inviteAdmin = asyncHandler(async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Validate the request body
    const { error, value } = validateAdminInvite(req.body);
    if (error) return res.status(400).send(error.details);
    // retrieve request body
    const { email, permissions, admin_type } = value;

    // check if account exist
    const checkAccount = await auth
      .findOne({ email: email, adminID: { $exists: true } })
      .populate('adminID', 'admin_type');

    if (checkAccount) {
      return next(
        new ErrorResponse(
          `Account already exist as a ${checkAccount.adminID.admin_type}`,
          409
        )
      );
    }

    const password = generateRandomPassword();
    console.log(password);

    // create an authentication profile
    const authProfile = await auth.create(
      [{ email: email, password: password }],
      { session, new: true }
    );
    await authProfile[0].save();

    // create the admin user
    const adminUser = await Admin.create(
      [
        {
          auth_id: authProfile[0]._id,
          admin_type: admin_type,
          email: email,
          permissions: []
        }
      ],
      { session: session, new: true }
    );

    // retrieve permission documents
    for (let i = 0; i < permissions.length; i++) {
      const permission = permissions[i];
      const permissionAccess = await Permission.findOne({
        name: permission
      });

      // add the permission to the admin user
      // if (permissionAccess) adminUser[0].permissions.push(permissionAccess);
      if (permissionAccess) {
        adminUser[0].permissions.push(permissionAccess._id);
      }
    }

    // save the admin user
    await adminUser[0].save();

    // Update Auth profile with the Admin ID
    await auth.findByIdAndUpdate(
      authProfile[0]._id,
      { adminID: adminUser[0]._id },
      { new: true, session: session, runValidators: true }
    );

    await session.commitTransaction();
    session.endSession();

    // Send Invitation Email
    const email_view = 'invite-admin';
    const sender_email = process.env.HELLO_EMAIL;
    const sender_pass = process.env.HELLO_PASS;
    const from = `Afrisplash Admin <${sender_email}>`;
    const subject = 'Invitation to Afrisplash Admin Dashboard';
    const permissionString = permissions.join(', ');
    const body = `You have been invited to Afrisplash dashboard as an admin user with the following permission(s): ${permissionString}. 
        Kindly proceed to login on the dashboard with the credentials: Email: ${email} Password: ${password}, 
        and verify your account by updating your password to a more secure password.`;

    // execute email sender service
    const send_email = await emailSender(
      email_view,
      sender_email,
      sender_pass,
      from,
      email,
      subject,
      body
    );

    if (!send_email.status) {
      // log: create mechanism to automatically retry sending email OR
      // notify Super Admin user to send it manually
      console.log(send_email);
    }
    return res.status(201).json(adminUser);
  } catch (error) {
    console.log(error);
    session.endSession();
    return next(new ErrorResponse('An error occured.', 500));
  }
});

/**
 * @author Timothy Adeyeye <adeyeyetimothy33@gmail.com>
 * @description Admin user login
 * @route `/api/v1/admins/login
 * @access Public
 * @type POST
 */
exports.login = asyncHandler(async (req, res, next) => {
  try {
    // validate the request body
    const { error, value } = validateAdminLogin(req.body);

    if (error) return res.status(400).send(error.details);

    const { email, password } = value;

    // check if account exist
    const authProfile = await auth
      .findOne({ email: email, adminID: { $exists: true } })
      .populate('adminID', 'admin_type');

    if (!authProfile) {
      return next(new ErrorResponse('Account does not exist', 404));
    }

    // check if password matches
    const isMatch = await authProfile.matchPassword(password);

    // if password no match
    if (!isMatch) return next(new ErrorResponse('Password incorrect', 401));

    // find the admin user
    const admin = await Admin.findOne({ email }).populate('permissions');

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
    return next(new ErrorResponse('An error occurred', 500));
  }
});

/**
 * @author Timothy Adeyeye <adeyeyetimothy33@gmail.com>
 * @description Logout
 * @route `/api/v1/admins/logout`
 * @access Public
 * @type GET
 */
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});

/**
 * @author Timothy Adeyeye <adeyeyetimothy33@gmail.com>
 * @description Get all admin users
 * @route `/api/v1/admins
 * @access Public
 * @type GET
 */
exports.getAllAdmins = asyncHandler(async (req, res, next) => {
  try {
    const admins = await Admin.find().populate('permissions', { name: true });

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 30;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = admins.length;

    const queryResult = admins.slice(startIndex, endIndex);

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
    //TODO: logger
    return next(new ErrorResponse('An error occurred', 500));
  }
});

/**
 * @author Timothy Adeyeye <adeyeyetimothy33@gmail.com>
 * @description Send email
 * @route `/api/v1/admins/email
 * @access Private
 * @type POST
 */
exports.sendEmail = asyncHandler(async (req, res, next) => {
  // validate the request body
  const { error, value } = validateSendEmail(req.body);

  if (error) return res.status(400).send(error.details);

  const { email, subject, body } = value;

  const email_view = 'invite-admin';
  const sender_email = process.env.HELLO_EMAIL;
  const sender_pass = process.env.HELLO_PASS;
  const from = `Afrisplash Admin <${sender_email}>`;

  // run email sender function
  const send_email = await emailSender(
    email_view,
    sender_email,
    sender_pass,
    from,
    email,
    subject,
    body
  );

  if (!send_email.status)
    return res.status(500).json({
      success: false,
      status: 'failed',
      message: 'Internal server error',
      error: send_email
    });

  return res.status(200).json({
    success: true,
    status: 'success',
    data: send_email
  });
});

/**
 * @author Timothy Adeyeye <adeyeyetimothy33@gmail.com>
 * @description Update password
 * @route `/api/v1/admins/update-password
 * @access Private
 * @type PATCH
 */
exports.updatePassword = (req, res) => {};
