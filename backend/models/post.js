const mongoose = require("mongoose");
const Joi = require("joi");
const postSchema = new mongoose.Schema({
  postContent: {
    type: String,
    maxLength: 1024,
    required: true,
  },
  image: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  like: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      created_at: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Post = mongoose.model("Post", postSchema, "posts");

const validatePost = (post) => {
  const schema = Joi.object({
    postContent: Joi.string().max(1024).required(),
    image: Joi.string().allow(""),
  });
  return schema.validate(post);
};

module.exports = { Post, validatePost };
