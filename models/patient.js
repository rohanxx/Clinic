const Joi = require('joi');

function validate(patient) {
    const schema = Joi.object({
      appointmentId: Joi.string().required(),
      dob: Joi.string().required(),
      diagnosis: Joi.string().max(255),
      email: Joi.string().min(5).max(255).required().email(),
      ergonomic_advice: Joi.string(),
      fee: Joi.string().required(),
      gender: Joi.string().required(),
      referred_by_dr: Joi.string(),
      treatment: Joi.string().required(),
      weight: Joi.string(),
    });
  
    return schema.validate(patient);
};

module.exports = validate;