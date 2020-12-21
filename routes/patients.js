const express = require("express");
const router = express.Router();
const { Patient, validate } = require("../models/patient");
const { Appointment } = require("../models/appointment");
const auth = require('../middleware/auth');
const mongoose = require("mongoose");
const { hash } = require("../common/hash");
const { sendCredentials } = require("../common/sms");
const multer = require("multer");
const _ = require("lodash");
var passwordGenerator = require('generate-password');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      new Date().toISOString().replace(/:/g, "-") + file.originalname
    );
  },
});

const upload = multer({ storage: storage });

// ! (POST) request for creating new patients...
router.post("/", upload.single('digitalSign'),auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const password = passwordGenerator.generate({
      length: 10,
      numbers: true,
      symbols: true
    });
    const date = new Date(req.body.dob);

    const newPatient = new Patient({
      // dob: req.body.dob,
      dob: date,
      diagnosis: req.body.diagnosis,
      email: req.body.email,
      ergonomic_advice: req.body.ergonomic_advice,
      fee: req.body.fee,
      gender: req.body.gender,
      referred_by_dr: req.body.referred_by_dr,
      treatment: req.body.treatment,
      weight: req.body.weight,
      password: await hash(password),
      digitalSign: req.file.path
    });

    const result = await newPatient.save();

    const appointment = await Appointment.findByIdAndUpdate(
      { _id: mongoose.Types.ObjectId(req.body.appointmentId) },
      { patientID: result._id.toString() }
    ).exec();

    await sendCredentials(appointment.fullName, password, appointment.phone);

    res.status(200).send(_.pick(result, ['_id', 'dob', 'diagnosis', 'email', 'ergonomic_advice', 'fee', 'gender', 'treatment', 'weight', 'referred_by_dr', 'patientImage', 'digitalSign']));
  } 
  catch (ex) {
    res.status(400).send(ex.message);
  }
});

module.exports = router;
