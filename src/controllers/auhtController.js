const express = require("express");
const mongoose = require("mongoose");
const User = require("../Schema/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const app = express();
require('dotenv').config({path: '../../.env'})

const Jwt_Sectet = process.env.Jwt_Sectet

app.use(express.json());



exports.signUp = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      user_id: req.body.user_id,
      email: req.body.email,
      password: hashedPassword,
      trusted_ips: [req.ip],
    });   
    
    await user.save();
    res.status(201).json({message: "User regestered successfull✅"});
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
      return res.status(401).send("INVALID Email");
    }
    const isPassword = await bcrypt.compare(req.body.password, user.password);
    if (user) {
      if (!isPassword) {
        return res.status(401).send("INVALID PASSWORD");
      }
    }

    if (user && isPassword) {
      const userIP = req.ip;
      const isIpKnown = user.trusted_ips.includes(userIP);
      if (!isIpKnown) {
        await user.trusted_ips.push(userIP);
        await user.save();
      }
      const token =  jwt.sign({email: user.email, role: user.role, id: user._id}, Jwt_Sectet ,{ expiresIn: '1hr' })
      
      return res.header("Authorization", token).json({
        token,
        message: "logged in successfully",
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
