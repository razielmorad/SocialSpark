const express = require("express");
const { User } = require("../models/user");
const route = express.Router();
const bcrypt = require("bcrypt");
const joi = require("joi");

route.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).send("user does not exist");
    return;
  }
  const isValid = await bcrypt.compare(req.body.password, user.password);

  if (!isValid) {
    res.status(400).send("email or password is not correct");
    return;
  }

  const token = user.generateAuthToken();
  res.send({ token });
});

const validate = (user) => {
  const schema = joi.object({
    email: joi.string().min(6).max(120).required().email(),
    password: joi.string().min(2).max(120).required(),
  });
  return schema.validate(user);
};

module.exports = route;
