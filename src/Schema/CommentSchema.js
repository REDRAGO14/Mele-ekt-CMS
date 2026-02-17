const { model, Schema } = require("mongoose");

const CommentSchema = Schema({
  commenter: { 
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
 },
  blog: { type: String, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Comment = model("comment", CommentSchema);

module.exports = Comment;
