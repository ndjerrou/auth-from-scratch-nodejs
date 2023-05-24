const Joi = require('joi');

module.exports = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error)
    return res.status(400).send({ ok: false, msg: error.details[0].message });

  next();
};
