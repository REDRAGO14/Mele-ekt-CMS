import { useEffect, useState } from 'react';
import { fetchBlogsPublic } from '../api/client';

/**
 * Blog feed; fields match Mongoose BlogSchema: title, content, author, isFlagged, Date, _id.
 */
export default function BlogFeed() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchBlogsPublic()
      .then((data) => {
        if (!cancelled) setBlogs(Array.isArray(data) ? data : []);
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
        Loading blogs…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 text-red-700 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-800">Blog feed</h1>
      {blogs.length === 0 ? (
        <p className="text-slate-500">No blogs yet.</p>
      ) : (
        <ul className="space-y-4">
          {blogs.map((blog) => (
            <li
              key={blog._id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h2 className="text-lg font-medium text-slate-900">{blog.title}</h2>
              <p className="mt-1 text-sm text-slate-500">
                {typeof blog.author === 'string' ? blog.author : blog.author?.email ?? '—'} · {blog.Date ? new Date(blog.Date).toLocaleDateString() : ''}
                {blog.isFlagged ? ' · Flagged' : ''}
              </p>
              <p className="mt-2 text-slate-700 whitespace-pre-wrap">{blog.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
