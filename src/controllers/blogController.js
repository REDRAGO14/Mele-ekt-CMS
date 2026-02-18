const express = require("express");
const Blog = require("../Schema/BlogSchema");
const comment = require("../Schema/CommentSchema");
const Comment = require("../Schema/CommentSchema");

const app = express();
app.use(express.json());


exports.All_Blogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "email -_id").populate("blogComments", "comment -_id -blog").sort({Engagement: -1}).lean();
    //here i use ai to get only the author email string not the email object
    const flattenedBlogs = blogs.map(blog => ({
      ...blog,
      author: blog.author ? blog.author.email : "Unknown" 
    }));

    res.json(flattenedBlogs);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.Create_Blog = async (req, res) => {
  try {
    const authorId = req.user.id;
    const blog = new Blog({
      title: req.body.title,
      content: req.body.content,
      isFlagged: req.isFlagged,
      author: authorId,
    });
    await blog.save();
    return res.status(201).json({message: "blog Created Successfully✅"});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};


exports.Delete_Blog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const role = req.user.role;
    const blog = await Blog.findOne({ _id: blogId });
    if (!blog) {
      return res.status(404).json({
        message: "blog not found.",
      });
    }
    const userId = req.user.id;
    const isOwner = String(blog.author) === String(userId);
    const isAuthorized = isOwner || role === "admin";
    if (isAuthorized) {
      await Blog.findByIdAndDelete(blogId); 
      await Comment.deleteMany({blog: blogId})

      return res.status(201).json({message: "Blog Deleted Successfully✅"});
    } else {
      res.status(403).json({
        message: "🚫you are not authorized",
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.Update_Blog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const isflagged = req.isFlagged;
    const updated_blog = req.body;
    console.log(updated_blog)
    const blog = await Blog.findOne({ _id: blogId });
    if (!blog) {
      return res.status(404).json({
        message: "blog not found.",
      });
    }
    const userId = req.user.id;
    const isAuthorized = String(blog.author) === String(userId);
    if (isAuthorized) {
      await Blog.findByIdAndUpdate(
        { _id: blogId },
        { $set: updated_blog, isFlagged: isflagged },
      );
      return res.status(201).json({ message: "blog Updated Successfully✅" });
    } else {
      res.status(403).json({
        message: "🚫you are not authorized",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
};
