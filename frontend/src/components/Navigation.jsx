import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  const onLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-serif text-xl font-bold text-gray-900">
            Mele-ekt CMS
          </Link>
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'text-gray-900 border-b-2 border-gray-900 pb-1'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Feed
            </Link>
            <Link
              to="/dashboard"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/dashboard'
                  ? 'text-gray-900 border-b-2 border-gray-900 pb-1'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Dashboard
            </Link>

            {token ? (
              <>
                <Link
                  to="/write"
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === '/write'
                      ? 'text-gray-900 border-b-2 border-gray-900 pb-1'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Write
                </Link>
                <button
                  onClick={onLogout}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/login'
                    ? 'text-gray-900 border-b-2 border-gray-900 pb-1'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
