const Joi = require("joi");
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name:{
    type: String,
    minLength: 2,
    maxLength: 120,
    required: true,
  },
  email: {
    type: String,
    minLength: 6,
    maxLength: 120,
    required: true,
  },
  message: {
    type: String,
    minLength: 2,
    maxLength: 120,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model("Contact", contactSchema, "contact");

const validateContact = (message) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(120).required(),
    message: Joi.string().min(2).max(1024).required(),
    email: Joi.string().min(6).max(120).required().email(),
  });
  return schema.validate(message);
};

module.exports = {
  Contact,
  validateContact,
};
