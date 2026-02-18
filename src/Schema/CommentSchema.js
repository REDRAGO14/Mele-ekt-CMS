const { model, Schema } = require("mongoose");

const CommentSchema = Schema({
  commenter: { 
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
 },
  blog: { type: Schema.Types.ObjectId, ref: "blog", required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

CommentSchema.post("save", async function(doc) {
    await model('blog').findByIdAndUpdate(doc.blog, {
        $inc : {Engagement: 1 }
    })

})
const Comment = model("comment", CommentSchema);


module.exports = Comment;
