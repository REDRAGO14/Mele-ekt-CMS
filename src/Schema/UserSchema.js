const mongoose = require("mongoose");

const userSchema = 
  new mongoose.Schema({
    user_id: { type: Number, unique: true, required: true, min: 1 },
    email: { type: String, unique: true, required: true },
    password: { type: String,  required: true },
    role: { type: String, unique: true, required: true, default: "user" },
    trusted_ips: { type: [String], default: [] },
    created_at: { type: Date, default: Date.now },
  });



module.exports = userSchema