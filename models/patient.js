const mongoose = require("mongoose");
const Joi = require("joi");

const Patient = mongoose.model(
  "Patient",
  new mongoose.Schema({
    age: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
      maxlength: 5,
    },
    patientImage: {
      type: String,
    },
  })
);

function validate(patient) {
  const schema = Joi.object({
    appointmentId: Joi.string().required(),
    age: Joi.number().required(),
    description: Joi.string().required(),
    address: Joi.string().required(),
    bloodGroup: Joi.string().required(),
  });

  return schema.validate(patient);
}

exports.Patient = Patient;
exports.validate = validate;
