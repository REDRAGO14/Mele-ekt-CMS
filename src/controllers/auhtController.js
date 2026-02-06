const express = require("express");
const mongoose = require("mongoose");
const userSchema = require("../Schema/UserSchema");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());

const User = mongoose.model("user", userSchema);

exports.signUp = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      user_id: req.body._id,
      email: req.body.email,
      password: hashedPassword,
      trusted_ips: req.ip,
    });
    await user.save();
    res.status(201).send("regestration successfull");
  } catch (err) {
    console.log(err)
    res.status(500).send("internal server error");
  }
};

exports.login = async (req, res) => {
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
      const userIP = req.ip;
      const isIpKnown = user.trusted_ips.includes(userIP);
      if (!isIpKnown) {
        await user.trusted_ips.push(userIP);
        await user.save();
      }
      res.status(201).json({
        message: "logged in successfully",
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
