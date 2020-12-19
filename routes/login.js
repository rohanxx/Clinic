const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
// const config = require("config");

//! (GET)..
router.get("/", async (req, res) => {
  const user = await User.find().sort({ name: 1 });
  res.send(user);
});

// ! (POST) request for creating new users...
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email }).exec();
  if (!user) return res.status(400).send("Invalid email or Password");

  //   * to compare email and password with the existing one in db...
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid E-mail or password");

  const token = jwt.sign({ _id: user._id, name: user.email }, "jwtToken");

  res.send(token);
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validateAsync(req);
}

module.exports = router;
