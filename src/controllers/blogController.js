const express = require("express");
const { model } = require("mongoose");
const BlogSchema = require("../Schema/BlogSchema");

const app = express();
app.use(express.json());

const Blog = model("blog", BlogSchema);

exports.Create_Blog = async (req, res) => {
  try {
    const authorEmail = req.user.email;
    const blog = new Blog({
      title: req.body.title,
      content: req.body.content,
      isFlagged: req.isFlagged,
      author: authorEmail,
    });
    await blog.save();
    res.status(201).send("blog Created Successfully✅")
  } catch (err) {
    console.log(err)
    res.status(500).json({error: "internal server error"})
  }
};

exports.All_Blogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author");
    res.json(blogs);
  } catch (err) {
    console.log(err);
  }
};
