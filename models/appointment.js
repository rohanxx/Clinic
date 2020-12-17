const mongoose = require('mongoose');
const Joi = require('joi');

const Appointment = mongoose.model('Appointment', new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        maxlength: 50
      },
    phone: {
        type: String,
        required: true
      },
    preferredDate: {
        type: Date,
        required: true
      },
    patientID: { 
        type: String,
        default: ''
    }
  }));
  
function validate(appointment) {
    const schema = Joi.object({
      fullName: Joi.string().max(50).required(),
      phone: Joi.string().required(),
      preferredDate: Joi.date().required()
    });

    return schema.validate(appointment);
} 

exports.Appointment = Appointment;
exports.validate = validate;
