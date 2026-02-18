import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBlogs, getPayloadFromToken, getBlogCountForUser } from '../api/client';

/**
 * Dashboard showing the current user's blog count (from blogs where author === user email).
 * User schema has no blogCount; we derive it from All_Blogs filtered by author.
 */
export default function Dashboard() {
  const navigate = useNavigate();
  const [blogCount, setBlogCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const payload = getPayloadFromToken();
    if (!payload || !payload.email) {
      setLoading(false);
      setError('Not logged in');
      return;
    }

    let cancelled = false;
    fetchBlogs()
      .then((blogs) => {
        if (cancelled) return;
        const count = getBlogCountForUser(Array.isArray(blogs) ? blogs : [], payload.email);
        setBlogCount(count);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px] text-slate-500">
        Loading dashboard…
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg bg-amber-50 text-amber-800 p-4">{error}</div>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="rounded-lg bg-slate-800 text-white px-4 py-2"
        >
          Back to feed
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-800">Dashboard</h1>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm max-w-sm">
        <p className="text-slate-500 text-sm">Your blog count</p>
        <p className="text-3xl font-bold text-slate-900 mt-1">{blogCount ?? 0}</p>
      </div>
      <button
        type="button"
        onClick={() => navigate('/')}
        className="rounded-lg bg-slate-800 text-white px-4 py-2"
      >
        View blog feed
      </button>
    </div>
  );
}
