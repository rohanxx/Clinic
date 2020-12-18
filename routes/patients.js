const express = require('express');
const router = express.Router();
const { Patient, validate } = require('../models/patient');
const { Appointment } = require('../models/appointment');
const mongoose = require('mongoose');
const { hash } = require('../common/hash');
const { sendCredentials } = require('../common/sms');
const multer = require("multer");
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


router.post('/', upload.single("patientImage"), async (req, res) => {
    const { error } = validate(req.body);   
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const date = new Date(req.body.dob);
       
        const newPatient = new Patient({
            // dob: req.body.dob,
            dob: date,
            email: req.body.email,
            description: req.body.description,
            address: req.body.address,
            bloodGroup: req.body.bloodGroup,
            password: await hash(req.body.password),
            patientImage: req.file.path
        });

        const result = await newPatient.save();

        const appointment = await Appointment.findByIdAndUpdate(
            { _id: mongoose.Types.ObjectId(req.body.appointmentId) },
            { patientID: result._id.toString() }
          ).exec();
        
        const response = await sendCredentials(req.body.password, appointment.phone);

        res.status(200).send(newPatient); 
    }
    catch(ex) {
        console.log(ex.message);
    }
});

module.exports = router;