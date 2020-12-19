const mongoose = require("mongoose");
const Joi = require("joi");

const Patient = mongoose.model(
  "Patient",
  new mongoose.Schema({
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    dob: {
      type: Date,
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
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
    patientImage: {
      type: String,
      required: true,
    },
  })
);

function validate(patient) {
  const schema = Joi.object({
    appointmentId: Joi.string().required(),
    email: Joi.string().min(5).max(255).required().email(),
    dob: Joi.string().required(),
    description: Joi.string().required(),
    address: Joi.string().required(),
    bloodGroup: Joi.string().required(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(patient);
}

exports.Patient = Patient;
exports.validate = validate;
