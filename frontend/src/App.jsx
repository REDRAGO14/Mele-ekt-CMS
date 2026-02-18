import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateBlog from "./features/editor/CreateBlog";
import AdminDash from "./pages/AdminDash";

function App() {
  const { user, loading, isAdmin } = useAuth();

  // Prevent flickering while checking if user is logged in
  if (loading)
    return (
      <div className="h-screen flex items-center justify-center serif italic text-gray-500">
        Mele-ekt is loading...
      </div>
    );

  return (
    <Router>
      <div className="min-h-screen bg-[#fcfcfc]">
        <Navbar />
        <main className="max-w-5xl mx-auto px-4">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />

            {/* Protected User Routes */}
            <Route
              path="/create"
              element={
                user ? (
                  <CreateBlog />
                ) : (
                  <Navigate to="/login" state={{ from: "/create" }} replace />
                )
              }
            />

            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={isAdmin ? <AdminDash /> : <Navigate to="/" />}
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
