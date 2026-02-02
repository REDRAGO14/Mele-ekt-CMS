const express = require("express");
require("./config/db"); // This runs the connection
const app = express();

app.use(express.json());

// Your routes here
app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});