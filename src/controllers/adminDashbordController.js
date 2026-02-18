const express = require("express");
const Blog = require("../Schema/BlogSchema");
const User = require("../Schema/UserSchema");
const app = express();
app.use(express.json());

exports.BlogsWithExtremeContents = async (req, res) => {
  try {
    // Support legacy data where isFlagged may have been stored as a string.
    const all_blog = await Blog.find({ isFlagged: { $in: [true, "true"] } })
      .populate("author", "email -_id")
      .lean(); // find blogs where isFlagged is true
    res.json(all_blog);
  } catch (error) {
    console.log(error);
  }
};


exports.adminDashboardAllUsers = async (req, res) =>{
const allUsers = await User.find().populate({path: "allBlogByUser", select: "title isFlagged  -_id -author", options: {virtuals: false}}).lean()
    res.send(allUsers)
}