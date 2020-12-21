const Joi = require('joi');

function validate(appointment) {
    const schema = Joi.object({
      fullName: Joi.string().max(50).required(),
      phone: Joi.string().required(),
      preferredDate: Joi.string().required(),
      message: Joi.string(),
      age: Joi.number().required()
    });
    return schema.validate(appointment);
} 

module.exports = validate;