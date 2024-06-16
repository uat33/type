const Post = require("../models/Post");
const asyncHandler = require("express-async-handler");

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().lean();
  if (!posts?.length) {
    return res.status(400).json({ message: "No posts found" });
  }

  res.json(users);
});

const createNewPost = asyncHandler(async (req, res) => {
  const { title, content, user } = req.body;

  if (!title || !user) {
    return res.status(400).json({ message: "Title and user required." });
  }

  const post = Post.create({ title, text: content, author: user });

  if (post) {
    res.status(201).json({ message: `New post created.` });
  } else {
    res.status(400).json({ message: `Invalid user data` });
  }
});

const updatePost = asyncHandler(async (req, res) => {
  const { id, title, content } = req.body;
  if (!id || !username || !password) {
    return res.status(400).json({ message: `All fields required` });
  }
  const post = await Post.findById(id).exec();
  if (!post) {
    return res.status(400).json({ message: `Post not found` });
  }

  post.title = title;
  post.text = content;

  const updatedPost = post.save();

  res.json({ message: `Post updated` });
});

const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: `All fields required` });
  }
  const post = await Post.findById(id).exec();
  if (!post) {
    return res.status(400).json({ message: `Post not found` });
  }

  const result = await user.deleteOne();

  res.json({ message: "Post deleted." });
});

module.exports = {
  getAllPosts,
  createNewPost,
  updatePost,
  deletePost,
};
