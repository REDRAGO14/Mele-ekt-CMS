const express = require("express");
require("dotenv").config({ path: "../.env" });
const auhtController = require("./controllers/auhtController");
const blogController = require("./controllers/blogController");
const commentController = require("./controllers/commentController");
const dbConnection = require("./config/db");
const verifyToken = require('./middleware/bouncer')
const contentGuard = require('./middleware/ContentGuard')
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

dbConnection();

app.get("/api/home", blogController.All_Blogs);

app.post("/api/sign_up", auhtController.signUp);

app.post("/api/login", auhtController.login);

app.get("/api/blogs",verifyToken, blogController.All_Blogs)
app.post("/api/blogs",verifyToken, contentGuard, blogController.Create_Blog);
app.put("/api/blogs/:id", verifyToken,contentGuard, blogController.Update_Blog )
app.delete("/api/blogs/:id",verifyToken, blogController.Delete_Blog)


app.post('/api/blog/comment/:id',verifyToken, commentController.Add_Comment)
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
