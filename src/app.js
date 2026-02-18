const express = require("express");
require("dotenv").config({ path: "../.env" });
const auhtController = require("./controllers/auhtController");
const blogController = require("./controllers/blogController");
const commentController = require("./controllers/commentController");
const admin_dashboard = require("./controllers/adminDashbordController");
const dbConnection = require("./config/db");
const verifyToken = require('./middleware/bouncer')
const isAdmin = require('./middleware/authorization')
const contentGuard = require('./middleware/ContentGuard')
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // If it's a preflight check, respond immediately with 200
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
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

app.get('/api/admin_dashboard',verifyToken, isAdmin, admin_dashboard.adminDashboardAllUsers)
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
