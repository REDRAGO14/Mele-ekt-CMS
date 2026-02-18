import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogService } from '../services/api';

export default function CreateBlog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      const data = await blogService.createBlog({ title, content });
      setInfo(data?.message || 'Blog created');
      setTitle('');
      setContent('');
      // navigate back to feed after a short delay
      setTimeout(() => navigate('/'), 700);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err.message ||
        'Failed to create blog';
      setError(String(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">
        Write a post
      </h1>
      <p className="text-gray-600 mb-6">
        Share your thoughts with the Mele-ekt community.
      </p>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-800 text-sm rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      {info && (
        <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-lg px-3 py-2">
          {info}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900/10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={8}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900/10"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center rounded-lg bg-gray-900 text-white px-4 py-2 text-sm font-semibold hover:bg-gray-800 disabled:opacity-60"
        >
          {loading ? 'Publishing…' : 'Publish'}
        </button>
      </form>
    </div>
  );
}

