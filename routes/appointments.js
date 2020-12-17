const express = require('express');
const router = express.Router();
const { Appointment, validate } = require('../models/appointment');
const { sendSms } = require('../common/sms');
   
router.get('/', async (req, res) => {
    const appointments = await Appointment.find();
    res.status(200).send(appointments);
});

router.post('/', async (req, res) => {
   const { error } = validate(req.body);   
   if (error) return res.status(400).send(error.details[0].message);

//    For testing purpose converting string to date
   const date = new Date(req.body.preferredDate);

   let appointment = new Appointment({
        fullName : req.body.fullName,
        phone: req.body.phone,
        // preferredDate: req.body.preferredDate,
        preferredDate: date 
   });

   try {
        appointment = await appointment.save();
        const r = await sendSms(appointment.phone);
        res.status(200).send(appointment);
   }
   catch(ex) {
       console.log(ex.message);
   }
});


module.exports = router;