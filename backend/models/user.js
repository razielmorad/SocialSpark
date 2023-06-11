const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { JWTSecretToken } = require("../configs/config");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minLength: 2,
    maxLength: 120,
    required: true,
  },
  lastName: {
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
  password: {
    type: String,
    minLength: 2,
    maxLength: 120,
    required: true,
  },
  admin: {
    type: Boolean,
    required: true,
  },
  profileImg: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id, admin: this.admin }, JWTSecretToken);
};

const User = mongoose.model("User", userSchema, "users");

const validateUser = (user) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(120).required(),
    lastName: Joi.string().min(2).max(120).required(),
    email: Joi.string().min(6).max(120).required().email(),
    password: Joi.string().min(2).max(120),
    profileImg: Joi.string().allow(""),
    admin: Joi.boolean(),
  });
  return schema.validate(user);
};

module.exports = {
  User,
  validateUser,
};
