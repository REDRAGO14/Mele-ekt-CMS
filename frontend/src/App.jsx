import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import BlogFeed from './pages/BlogFeed';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100">
        <nav className="border-b border-slate-200 bg-white shadow-sm">
          <div className="mx-auto max-w-4xl px-4 py-3 flex items-center gap-4">
            <Link to="/" className="font-medium text-slate-800 hover:text-slate-600">
              Blog feed
            </Link>
            <Link to="/dashboard" className="font-medium text-slate-600 hover:text-slate-800">
              Dashboard
            </Link>
            <Link to="/login" className="font-medium text-slate-600 hover:text-slate-800 ml-auto">
              Log in
            </Link>
          </div>
        </nav>
        <main className="mx-auto max-w-4xl px-4 py-8">
          <Routes>
            <Route path="/" element={<BlogFeed />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
