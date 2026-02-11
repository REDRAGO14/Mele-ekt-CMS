const {Schema}  = require("mongoose");

const BlogSchema = Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: {
    type: Schema.Types.ObjectId,
    required: true
  },
  isFlagged: { type: String, required: true, default: false },
  Date: { type: Date, default: Date.now },
});

module.exports = BlogSchema;