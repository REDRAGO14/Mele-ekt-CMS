const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config({ path: "../.env" });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(express.json());

const db_URL = process.env.MONGO_URL;

mongoose
  .connect(db_URL)
  .then(() => console.log("database is connected successfully"))
  .catch((err) => console.error("database failed to connect", err));

const userSchema = new mongoose.Schema({
  user_id: { type: Number, unique: true, required: true, min: 1 },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user", required: true },
  trusted_ips: { type: [String], default: [] },
  created_at: { type: Date, default: Date.now },
});
const User = mongoose.model("user", userSchema);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/api/sign_up", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      user_id: req.body._id,
      email: req.body.email,
      password: hashedPassword,
      trusted_ips: req.ip,
    });
    const savedUser = await user.save();
    res.status(201).send(savedUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      res.status(401).send("INVALID Email");
    }
    const isPassword = await bcrypt.compare(req.body.password, user.password);
    if (user) {
      if (!isPassword) {
        res.status(401).send("INVALID PASSWORD");
      }
    }

    if (user && isPassword) {
      res.status(201).json({
        message: "logged in successfully",
      });
    }
  } catch {}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
