const mongoose = require("mongoose");
require("dotenv").config();

const dbURL = process.env.MANGO_URL;

mongoose.connect(dbURL)
  .then(() => {
    console.log("✅ Database is connected successfully");
  })
  .catch((err) => {
    console.log("DB connection failed:", err);
  });

module.exports = mongoose;