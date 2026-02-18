const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });
const cors = require("cors");
const auhtController = require("./controllers/auhtController");
const blogController = require("./controllers/blogController");
const commentController = require("./controllers/commentController");
const admin_dashboard = require("./controllers/adminDashbordController");
const dbConnection = require("./config/db");
const verifyToken = require('./middleware/bouncer')
const isAdmin = require('./middleware/authorization')
const contentGuard = require('./middleware/ContentGuard')
const PORT = process.env.PORT || 3000;

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173","http://localhost:5174"],
    credentials: true,
  }),
);
app.use(express.json());

dbConnection();

app.get("/api/home", blogController.All_Blogs);

app.post("/api/sign_up", auhtController.signUp);

app.post("/api/login", auhtController.login);

app.get("/api/blogs", verifyToken, blogController.All_Blogs)
app.get("/api/blogs/:id", blogController.Blog_Detail)
app.post("/api/blogs", verifyToken, contentGuard, blogController.Create_Blog);
app.put("/api/blogs/:id", verifyToken, contentGuard, blogController.Update_Blog)
app.delete("/api/blogs/:id", verifyToken, blogController.Delete_Blog)


app.post('/api/blog/comment/:id',verifyToken, commentController.Add_Comment)

app.get('/api/admin_dashboard',verifyToken, isAdmin, admin_dashboard.adminDashboardAllUsers)
app.get('/api/admin_flagged_blogs',verifyToken, isAdmin, admin_dashboard.BlogsWithExtremeContents)
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
