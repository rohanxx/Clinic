const mongoose = require("mongoose");
const Joi = require("joi");

const Patient = mongoose.model(
  "Patient",
  new mongoose.Schema({
    dob: {
      type: Date,
      required: true,
    },
    diagnosis: {
      type: String,
      required: true,
    },
    digitalSign: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    ergonomic_advice: {
      type: String,
      required: true,
    },
    fee: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "other"],
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
    referred_by_dr: {
      type: String,
      default: "",
    },
    treatment: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
  })
);

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
}

exports.Patient = Patient;
exports.validate = validate;
