# 🚀 Mele-ekt CMS: Development Roadmap & Task List

**Project Goal:** Build a professional, community-driven blogging platform (Substack/Reddit style) with real-time interaction and automated moderation.

---

## 🏗️ Phase 1: High-Performer Project Scaffolding
*Goal: Establishing the MVC (Model-View-Controller) architecture.*

- [ ] **T1.1:** Initialize Node.js environment and configure `package.json` scripts (start, dev).
- [ ] **T1.2:** Implement professional directory structure (`src/controllers`, `src/models`, `src/middleware`, `src/routes`).
- [ ] **T1.3:** Setup environment variables in `.env` for `PORT` and `MONGO_URI`.
- [ ] **T1.4:** Create singleton database connection logic in `src/config/db.js` using Mongoose.
- [ ] **T1.5:** Configure Global Middleware: `cors`, `express.json()`, and a custom `logger`.

---

## 🛡️ Phase 2: Identity & Security Logic (Identity Module)
*Goal: Implementing IP-based tracking and Role-Based Access Control (RBAC).*

- [ ] **T2.1:** Design **User Schema**: Define `username`, `password`, `role` (Admin/User), and `trusted_ips[]`.
- [ ] **T2.2:** Build **IP-Capture Middleware**: Extract `req.ip` and attach it to the request object.
- [ ] **T2.3:** Implement **Signup Controller**: Capture user details and their registration IP.
- [ ] **T2.4:** Implement **Login Controller**: Update `lastKnownIP` upon successful credential match.
- [ ] **T2.5:** Develop **IP-Auto-Login Logic**: Middleware to allow access if the current IP matches a `trusted_ip`.
- [ ] **T2.6:** Create `/api/auth/register` and `/api/auth/login` routes.

---

## 📝 Phase 3: Content Engine & Moderation (CRUD Module)
*Goal: Substack-style posting with automated "Extreme Content" filtering.*

- [ ] **T3.1:** Design **Post Schema**: Define `title`, `content`, `author` (User reference), and `isFlagged`.
- [ ] **T3.2:** Build **Content Guard Middleware**: Regex-based scanner for "Extreme Content" (e.g., violence, murder).
- [ ] **T3.3:** Implement **Post Creation Logic**: Integrate `Content Guard` to automatically flag posts.
- [ ] **T3.4:** Implement **Read Operations**: Fetch all posts with `.populate('author')` for the Home feed.
- [ ] **T3.5:** Implement **Update/Delete Logic**: Secure routes so only the Author or Admin can modify content.
- [ ] **T3.6:** Create `/api/posts` endpoints for all CRUD operations.

---

## 💬 Phase 4: Interaction & Admin Oversight
*Goal: Community engagement and moderation dashboard.*

- [ ] **T4.1:** Design **Comment Schema**: Link to both `Post` and `User` models.
- [ ] **T4.2:** Implement **Comment Creation**: Allow users to engage with specific blog posts.
- [ ] **T4.3:** Build **Admin Middleware**: Restrict access to moderation routes based on the `role` field.
- [ ] **T4.4:** Create **Admin Dashboard Endpoint**: Fetch all posts marked as `isFlagged: true`.
- [ ] **T4.5:** Implement **Leaderboard Query**: Aggregate user points based on post frequency and engagement.

---

## 🧪 Phase 5: Testing, Documentation & Deployment
*Goal: Ensuring the system is "Production Ready."*

- [ ] **T5.1:** Conduct **Integration Testing**: Verify IP-tracking and Content Filter using Postman.
- [ ] **T5.2:** Global Error Handling: Create a central middleware to catch all API errors.
- [ ] **T5.3:** Create **API Documentation**: Document all endpoints, request bodies, and responses.
- [ ] **T5.4:** Final Deployment: Deploy backend to **Railway** and connect the MongoDB Atlas cluster.

---

**Current Focus:** Week 6 - Completing Phase 1 and 2 logic.
