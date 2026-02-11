const express = require("express");
const { model } = require("mongoose");
const BlogSchema = require("../Schema/BlogSchema");

const app = express();
app.use(express.json());

const Blog = model("blog", BlogSchema);

exports.Create_Blog = (req, res) => {
  try {
    const authorId = req.user.id
    const blog = new Blog({
        title: req.body.title,
        content: req.body.content,
        isFlagged: req.isFlagged,
        author: authorId 
    });
    console.log(blog)
  } catch (err) {}
};
