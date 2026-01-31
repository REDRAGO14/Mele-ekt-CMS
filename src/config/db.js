const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const app = express();
app.use(express.json())


require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const dbURL = process.env.MANGO_URL;
const PORT = process.env.PORT

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("database is connected successfully✅")
})
  .catch((err) => console.log("db connection feild", err));

app.listen(PORT, () => console.log(`🚀server runnig on http://localhost:${PORT}`));
