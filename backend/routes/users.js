const express = require("express");
const { User, validateUser } = require("../models/user");
const authMw = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { default: mongoose } = require("mongoose");

const route = express.Router();

route.post("/new", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(400).send("email already registered");
    return;
  }
  user = await new User({
    ...req.body,
    password: await bcrypt.hash(req.body.password, 12),
  }).save();

  res.send(_.pick(user, "_id", "firstName", "lastName", "email", "admin"));
});

route.get("/myUser", authMw, async (req, res) => {
  const user = await User.findById({ _id: req.user._id }, { password: 0 });
  res.send(
    _.pick(
      user,
      "_id",
      "firstName",
      "lastName",
      "email",
      "admin",
      "createdAt",
      "profileImg"
    )
  );
});

route.get("/allUsers", authMw, async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

route.put("/updateImg", authMw, async (req, res) => {
  console.log(req.body);
  const updatedUser = await User.findByIdAndUpdate(
    { _id: req.user._id },
    { $set: { profileImg: req.body.profileImg } },
    { new: true }
  );
  if (!updatedUser) {
    return res.status(404).send({ message: "User not found" });
  }
  res.send(updatedUser);
});

route.put("/deleteProImg", authMw, async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    { _id: req.user._id },
    { $set: { profileImg: null } },
    { new: true }
  );
  if (!updatedUser) {
    return res.status(404).send({ message: "User not found" });
  }
  console.log(updatedUser);
  res.send(updatedUser);
});

route.get("/:id", authMw, async (req, res) => {
  console.log(req.params.id);
  const user = await User.findById({ _id: req.params.id }, { password: 0 });
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  res.send(user);
});

route.post("/getUsers", async (req, res) => {
  const userIds = req.body.userIds;
  try {
    for (const id of userIds) {
      let i = userIds.indexOf(id);
      if (i !== -1) {
        userIds[i] = new mongoose.Types.ObjectId(id);
      }
    }
    const user = await User.find({ _id: { $in: userIds } }, { password: 0 });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    console.log(user);
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

module.exports = route;
