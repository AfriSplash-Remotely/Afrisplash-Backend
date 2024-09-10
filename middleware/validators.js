const Joi = require('joi');
const permissions = require('../config/permissions.string');

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const inviteAdminSchema = Joi.object({
  email: Joi.string().email().required(),
  admin_type: Joi.string().valid('admin', 'super-admin').required(),
  // password: Joi.string().min(3).max(10).required(),
  permissions: Joi.array()
    .items(Joi.string().valid(...permissions))
    .min(1)
    .required()
});

const loginAdminSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .min(8)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
    .message(
      'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*)'
    )
});

const jobStatus = Joi.object({
  status: Joi.string().valid('Active', 'Expired', 'Archived').required()
});

const jobTimeRange = Joi.object({
  timeRange: Joi.string()
    .valid('past24hours', 'pastweek', 'pastmonth', 'anytime')
    .required()
});

const sendEmailSchema = Joi.object({
  email: Joi.string().email().required(),
  subject: Joi.string().required(),
  body: Joi.string().required()
});

const createReportSchema = Joi.object({
  reported_item: Joi.string().required(),
  reason: Joi.string().required(),
  type: Joi.string()
    .valid('post', 'user', 'company', 'job', 'comment')
    .required()
});

const passwordSchema = Joi.object({
  password: Joi.string()
    .required()
    .min(8)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
    .message(
      'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*)'
    )
});

const jobSchema = Joi.object({
  title: Joi.string().required(),
  industry: Joi.string().required(),
  description: Joi.string().required(),
  requirement: Joi.string().required(),
  benefit: Joi.string().required(),
  experience: Joi.string()
    .valid('Intermediate', 'Beginner', 'Senior', 'Junior', 'All')
    .required(),
  type: Joi.string().valid('Remote', 'Onsite', 'Hybrid').required(),
  status: Joi.string().valid('Active', 'Expired', 'Archived').required(),
  // location: Joi.string().required(),
  salaryType: Joi.string().valid('fixed', 'range').required(),
  salary: Joi.object()
    .when('salaryType', {
      is: 'fixed',
      then: Joi.object({
        amount: Joi.number().required(),
        min: Joi.forbidden(),
        max: Joi.forbidden(),
        currency: Joi.string().required(),
        period: Joi.string().required()
      }),
      otherwise: Joi.object({
        amount: Joi.forbidden(),
        min: Joi.number().required(),
        max: Joi.number().required(),
        currency: Joi.string().required(),
        period: Joi.string().required()
      })
    })
    .required(),
  expiry: Joi.number().optional()
  // external_data: Joi.object({
  //   image: Joi.string().uri().required(),
  //   url: Joi.string().uri().required(),
  //   date: Joi.date().iso().required()
  // }).required()
}).options({ allowUnknown: true });

const applyJobSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  jobTitle: Joi.string().optional(),
  country: Joi.string().required(),
  phoneNumber: Joi.string().optional(),
  resumeURL: Joi.string().required()
});

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string()
    .required()
    .min(8)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
    .message(
      'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*)'
    )
});

const contactUsSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  message: Joi.string().required(),
  additional_details: Joi.string().optional()
});

const validateAdminInvite = validator(inviteAdminSchema);
const validateAdminLogin = validator(loginAdminSchema);
const validateJobStatus = validator(jobStatus);
const validateJobTimeRange = validator(jobTimeRange);
const validateSendEmail = validator(sendEmailSchema);
const validateReportSchema = validator(createReportSchema);
const validatePasswordSchema = validator(passwordSchema);
const validateCreateJob = validator(jobSchema);
const validateApplyJobSchema = validator(applyJobSchema);
const validateChangePasswordSchema = validator(changePasswordSchema);
const validateContactUsSchema = validator(contactUsSchema);

const joiErrorMessage = (error) => {
  return error.details.map((detail) => {
    return {
      path: detail.path.join('.'),
      message: detail.message.replace(/"/g, '')
    };
  });
};

module.exports = {
  joiErrorMessage,
  validateAdminInvite,
  validateAdminLogin,
  validateJobStatus,
  validateJobTimeRange,
  validateSendEmail,
  validateReportSchema,
  validatePasswordSchema,
  validateCreateJob,
  validateApplyJobSchema,
  validateChangePasswordSchema,
  validateContactUsSchema
};
