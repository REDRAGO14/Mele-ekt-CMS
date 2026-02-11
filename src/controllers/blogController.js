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
    res.status(201).send("blog Created Successfully✅");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
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

exports.Delete_Blog = async (req, res) => {
  try {
    const blogId = req.body.blogId;
    const email = req.user.email;
    const role = req.user.role;
    const blog = await Blog.findOne({ _id: blogId });
    if (!blog) {
     return res.status(401).json({
        message: "blog not found.",
      });
    }
    const isAuthorized = email === blog.author || role === "admin";
    if (isAuthorized) {
      await Blog.findByIdAndDelete(blogId);
      console.log(blog);

      return res.json("blog deleted");
    } else {
      res.status(403).json({
        message: "you are not authorized",
      });
    }
  } catch (err) {
    return res.status(500).json({
        error: err.message
    });
  }
};
