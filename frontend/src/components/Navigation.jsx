import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  const onLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <nav className="border-b border-neutral-200 bg-white/80 backdrop-blur">
      <div className="max-w-[1100px] mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-serif text-xl font-bold text-neutral-950">
            Mele-ekt CMS
          </Link>
          <div className="flex items-center gap-5">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'text-neutral-950'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              Feed
            </Link>
            <Link
              to="/dashboard"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/dashboard'
                  ? 'text-neutral-950'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              Dashboard
            </Link>

            {token ? (
              <>
                <Link
                  to="/write"
                  className="rounded-full bg-neutral-900 text-white px-4 py-2 text-sm font-semibold hover:bg-neutral-800"
                >
                  Write
                </Link>
                <button
                  onClick={onLogout}
                  className="text-sm font-medium text-neutral-600 hover:text-neutral-950"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/login'
                    ? 'text-neutral-950'
                    : 'text-neutral-600 hover:text-neutral-950'
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
