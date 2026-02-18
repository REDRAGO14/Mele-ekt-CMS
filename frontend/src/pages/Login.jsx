import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await authService.login({ email, password });
      if (data?.token) localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data ||
        err.message ||
        'Login failed';
      setError(String(message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">
        Sign in
      </h1>
      <p className="text-gray-600 mb-8">
        Admin dashboard requires an account.
      </p>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900/10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="current-password"
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900/10"
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full rounded-lg bg-gray-900 text-white px-3 py-2 text-sm font-semibold hover:bg-gray-800 disabled:opacity-60"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="text-sm text-gray-600 mt-6">
        No account?{' '}
        <Link to="/register" className="text-gray-900 underline">
          Create one
        </Link>
      </p>
    </div>
  );
}

