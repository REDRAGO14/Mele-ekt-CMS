const express = require("express");
require("dotenv").config({ path: "../.env" });
const auhtController = require("./controllers/auhtController");
const blogController = require("./controllers/blogController");
const dbConnection = require("./config/db");
const verifyToken = require('./middleware/bouncer')
const contentGuard = require('./middleware/ContentGuard')
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

dbConnection();

app.get("/", verifyToken, (req, res) => {
  res.send("Server is running");
});

app.post("/api/sign_up", auhtController.signUp);

app.post("/api/login", auhtController.login);
app.post("/api/create_blog",verifyToken, contentGuard, blogController.Create_Blog);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
