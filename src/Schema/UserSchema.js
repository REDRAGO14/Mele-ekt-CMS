const mongoose = require("mongoose");

const userSchema = 
  new mongoose.Schema({
    user_id: { type: Number, unique: true, required: true, min: 1 },
    email: { type: String, unique: true, required: true },
    password: { type: String,  required: true },
    role: { type: String, required: true, default: "user" },
    trusted_ips: { type: [String], default: [] },
    blogCount: {type: Number, default: 0},
    created_at: { type: Date, default: Date.now },
  },
  { toJSON: { virtuals: true, id: false }, toObject: { virtuals: true, id: false } },
);

userSchema.virtual("allBlogByUser", {
  ref: "blog",
  localField: "_id",
  foreignField: "author"
})

const User = mongoose.model("user", userSchema);

module.exports = User