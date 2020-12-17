const express = require('express');
const router = express.Router();
const { Patient, validate } = require('../models/patient');
const { Appointment } = require('../models/appointment');
const mongoose = require('mongoose');

router.post('/', async (req, res) => {
   const { error } = validate(req.body);   
   if (error) return res.status(400).send(error.details[0].message);

   try {
        const appointments = await Appointment.find({ "_id": mongoose.Types.ObjectId(req.body.appointmentId)}).exec();

        const newPatient = new Patient({
            age: req.body.age,
            description: req.body.description,
            address: req.body.address,
            bloodGroup: req.body.bloodGroup
        });
        appointments.patientId = newPatient._id.toString();
        const result = await newPatient.save();
        
    
        res.status(200).send(result); 
    }
   catch(ex) {
        console.log(ex.message);
   }
});

module.exports = router;