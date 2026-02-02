const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config({ path: "../.env" });

const db_URL = process.env.MONGO_URL;

mongoose
  .connect(db_URL)
  .then(() => console.log("database is connected successfully"))
  .catch((err) => console.error("database failed to connect", err));

const userSchema = new mongoose.Schema({
  user_id: { type: Number, unique:true, required: true, min: 1 },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user", required: true },
  trusted_ips: { type: [String], default: [] },
  created_at: { type: Date, default: Date.now },
});

async function createUser() {
  const User = mongoose.model("User", userSchema);
  const user = new User({
    user_id: 2,
    email: "test2@gmail.com",
    password: "test2123",
    trusted_ips: "127:0:0:12",
  });

  const result = await user.save();
  console.log(result);
}
createUser();
app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
