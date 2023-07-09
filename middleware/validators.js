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

const validateAdminInvite = validator(inviteAdminSchema);
const validateAdminLogin = validator(loginAdminSchema);
const validateJobStatus = validator(jobStatus);
const validateJobTimeRange = validator(jobTimeRange);

module.exports = {
  validateAdminInvite,
  validateAdminLogin,
  validateJobStatus,
  validateJobTimeRange
};
// exports.validateAdminInvite = validator(inviteAdminSchema);
