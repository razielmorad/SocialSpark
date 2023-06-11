const express = require("express");
const authMw = require("../middleware/auth");
const route = express.Router();
const { Post, validatePost } = require("../models/post");
const _ = require("lodash");

route.post("/", authMw, async (req, res) => {
  const { error } = validatePost(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  console.log(req.user);
  const post = new Post({
    ...req.body,
    user_id: req.user._id,
  });
  await post.save();

  res.send(post);
});

route.get("/allPosts", authMw, async (req, res) => {
  const allPosts = await Post.find({});
  res.send(allPosts);
});

route.get("/userPosts", authMw, async (req, res) => {
  const myPosts = await Post.find({ user_id: req.user._id });

  if (!myPosts) {
    res.status(400).send("no posts were found");
    return;
  }
  res.send(myPosts);
});

route.put("/like/:id", authMw, async (req, res) => {
  const post_id = req.params.id;
  const user_id = req.user._id;
  const isLiked = req.body.isLiked;
  if (!isLiked) {
    const response = await Post.findByIdAndUpdate(
      post_id,
      {
        $addToSet: { like: user_id },
      },
      { new: true }
    );
    res.send(response);
  } else {
    const response = await Post.findByIdAndUpdate(
      post_id,
      {
        $pull: { like: user_id },
      },
      { new: true }
    );
    res.send(response);
  }
});

route.put("/comments/:id", authMw, async (req, res) => {
  const post_id = req.params.id;
  const user_id = req.user._id;
  const comment = req.body.comment.comment;

  const commentData = {
    user_id: user_id,
    comment: comment,
  };
  console.log(comment);
  try {
    const response = await Post.findByIdAndUpdate(
      post_id,
      {
        $addToSet: { comments: commentData },
      },
      { new: true }
    );
    res.send(response);
  } catch (err) {
    return res.status(400).send("no posts were found");
  }
});

route.get("/:id", authMw, async (req, res) => {
  const posts = await Post.find({ user_id: req.params.id });
  if (!posts) {
    res.status(400).send("no posts were found");
  }
  res.send(posts);
});


route.get("/likedPosts/:id", authMw, async (req, res) => {
  const user_id = req.params.id;

  try {
    const likedPosts = await Post.find({ like: user_id });

    if (likedPosts.length === 0) {
      res.status(200).send("No liked posts found for the user.");
      return;
    }

    res.send(likedPosts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
});

module.exports = route;
