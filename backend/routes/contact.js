const express = require("express");
const route = express.Router();
const joi = require("joi");
const { Contact } = require("../models/contact");

route.post("/new", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    console.log(error);
    res.status(400).send(error.details[0].message);
    return;
  }
  let contact = await new Contact({ ...req.body }).save();
  res.send(contact);
});

const validate = (contact) => {
  const schema = joi.object({
    name: joi.string().min(2).max(120).required(),
    email: joi.string().min(6).max(120).required().email(),
    message: joi.string().min(2).max(256).required(),
  });
  return schema.validate(contact);
};

module.exports = route;
