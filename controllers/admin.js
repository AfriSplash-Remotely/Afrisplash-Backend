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

/**
 * @author Timothy Adeyeye <adeyeyetimothy33@gmail.com>
 * @description Invite/Create Admin user
 * @route `/api/v1/admins/invite
 * @access Restricted
 * @type POST
 */
exports.inviteAdmin = asyncHandler(async (req, res, next) => {
  try {
    // Validate the request body
    const { error, value } = validateAdminInvite(req.body);

    if (error) return res.status(400).send(error.details);

    const { email, permissions } = value;
    const password = '1234@splash';

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

    // Send Invitation Email
    const email_view = 'invite-admin';
    const sender_email = process.env.NO_REPLY_EMAIL;
    const sender_pass = process.env.NO_REPLY_PASS;
    const from = `Afrisplash Admin <${sender_email}>`;
    const subject = 'Invitation to Afrisplash Dashboard';
    const permissionString = permissions.join(', ');
    const body = `You have been invited to Afrisplash dashboard as an admin user with the following permissions ${permissionString}. Kindly proceed to login on the dashboard with the credentials: Email-${email} Password-${password}, and verify your account by updating your password to a more secure password.`;

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
    if (!send_email) {
      // log: create mechanism to automatically retry sending email OR
      // notify Super Admin user to probably send it manually
      console.log(send_email);
    }
    return res.status(201).json(adminUser);
  } catch (error) {
    if (error.code === 11000)
      return next(new ErrorResponse('Email user already invited', 409));

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
    return next(new ErrorResponse('An error occurred', 500));
  }
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
