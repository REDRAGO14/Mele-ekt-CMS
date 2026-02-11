const express = require("express");
require("dotenv").config({ path: "../.env" });
const auhtController = require("./controllers/auhtController");
const dbConnection = require("./config/db");
const verifyToken = require('./middleware/bouncer')
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

dbConnection();

app.get("/", verifyToken, (req, res) => {
  res.send("Server is running");
});

app.post("/api/sign_up", auhtController.signUp);

app.post("/api/login", auhtController.login);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
