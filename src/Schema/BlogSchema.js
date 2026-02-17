const { Schema, model } = require("mongoose");

const BlogSchema = Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  comments: {
    type: Schema.Types.ObjectId,
    ref: "comment",
  },
  isFlagged: { type: String, required: true, default: false },
  Date: { type: Date, default: Date.now },
});
const Blog = model("blog", BlogSchema);
module.exports = Blog;
