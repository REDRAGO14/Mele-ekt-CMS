import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import BlogFeed from './components/BlogFeed';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#fcfcfc]">
        <Navigation />
        <Routes>
          <Route path="/" element={<BlogFeed />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
