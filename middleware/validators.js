const Joi = require('joi');

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const inviteAdminSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(10).required(),
  permissions: Joi.array().items(Joi.string()).min(1)
});

exports.validateAdminInvite = validator(inviteAdminSchema);
