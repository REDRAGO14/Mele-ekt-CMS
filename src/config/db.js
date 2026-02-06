const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

const dbURL = process.env.MONGO_URL;

const dbConnection = () => {
  mongoose
    .connect(dbURL)
    .then(() => {
      console.log("✅ Database is connected successfully");
    })
    .catch((err) => {
      console.log("DB connection failed:", err);
      });}
 
module.exports = dbConnection;
