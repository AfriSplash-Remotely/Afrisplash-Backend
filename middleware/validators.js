const Joi = require('joi');

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const inviteAdminSchema = Joi.object({
  email: Joi.string().email().required(),
  // password: Joi.string().min(3).max(10).required(),
  permissions: Joi.array().items(Joi.string()).min(1).required()
});

const loginAdminSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(10).required()
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
  type: Joi.string().valid('post', 'user', 'company', 'job').required()
});

const validateAdminInvite = validator(inviteAdminSchema);
const validateAdminLogin = validator(loginAdminSchema);
const validateJobStatus = validator(jobStatus);
const validateJobTimeRange = validator(jobTimeRange);
const validateSendEmail = validator(sendEmailSchema);
const validateReportSchema = validator(createReportSchema);

module.exports = {
  validateAdminInvite,
  validateAdminLogin,
  validateJobStatus,
  validateJobTimeRange,
  validateSendEmail,
  validateReportSchema
};
// exports.validateAdminInvite = validator(inviteAdminSchema);
