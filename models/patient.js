const mongoose = require('mongoose');
const Joi = require('joi');

const Patient = mongoose.model('Patient', new mongoose.Schema({
    dob: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    patientImage: {
        type: String,
        required: true
    }
}));


function validate(patient) {
    const schema = Joi.object({
        appointmentId: Joi.string().required(),
        dob: Joi.string().required(),
        description: Joi.string().required(),
        address: Joi.string().required(),
        bloodGroup: Joi.string().required()
    });
  
    return schema.validate(patient);
}

exports.Patient = Patient;
exports.validate = validate;