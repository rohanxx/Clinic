const express = require('express');
const router = express.Router();
const { Patient, validate } = require('../models/patient');
const { Appointment } = require('../models/appointment');
const mongoose = require('mongoose');
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
            description: req.body.description,
            address: req.body.address,
            bloodGroup: req.body.bloodGroup,
            patientImage: req.file.path
        });

        const result = await newPatient.save();

        await Appointment.findByIdAndUpdate(
            { _id: mongoose.Types.ObjectId(req.body.appointmentId) },
            { patientID: result._id.toString() }
          ).exec();
        
        res.status(200).send(result); 
    }
    catch(ex) {
        console.log(ex.message);
    }
});

module.exports = router;