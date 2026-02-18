const { Schema, model } = require("mongoose");
const { virtual, virtuals } = require("./UserSchema");

const BlogSchema = Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    isFlagged: { type: String, required: true, default: false },
    Date: { type: Date, default: Date.now },
    Engagement: {type: Number , default: 0 }
  },
  { toJSON: { virtuals: true, id: false }, toObject: { virtuals: true, id: false } },
);

BlogSchema.virtual("blogComments", {
  ref: "comment",
  localField: "_id",
  foreignField: "blog"
})
BlogSchema.post('save', async function(doc){
  await model('user').findByIdAndUpdate(doc.author, {
    $inc: {blogCount: 1}
  })
})
BlogSchema.post("findOneAndDelete", async function(doc){
  await model("user").findByIdAndUpdate(doc.author, {
    $inc: {blogCount: -1}
  })
  console.log("decreased")
})
const Blog = model("blog", BlogSchema);
module.exports = Blog;
