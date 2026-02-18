import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, MessageCircle } from 'lucide-react';
import { blogService } from '../services/api';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await blogService.getBlogById(id);
        setBlog(data);
        setLoading(false);
      } catch (err) {
        const msg =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          err.message ||
          'Failed to load blog';
        setError(String(msg));
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500">Loading blog…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-1">
          {blog.author || 'Unknown Author'}
        </p>
        <p className="text-xs text-gray-500">{formatDate(blog.Date)}</p>
      </div>

      <h1 className="font-serif text-4xl font-bold text-gray-900 mb-6 leading-tight">
        {blog.title}
      </h1>

      <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4" />
          <span>{blog.Engagement || 0}</span>
        </div>
        {blog.comments && blog.comments.length > 0 && (
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            <span>{blog.comments.length}</span>
          </div>
        )}
      </div>

      {blog.isFlagged && (
        <div className="mb-4 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
          ⚠️ This content has been flagged for review
        </div>
      )}

      <div className="prose prose-lg max-w-none mb-10">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {blog.content}
        </p>
      </div>

      <section>
        <h2 className="font-semibold text-lg text-gray-900 mb-3">
          Comments ({blog.comments?.length || 0})
        </h2>

        {(!blog.comments || blog.comments.length === 0) && (
          <p className="text-sm text-gray-500">
            No comments yet. Be the first to comment via the API.
          </p>
        )}

        <div className="space-y-4 mt-2">
          {blog.comments?.map((c, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg px-3 py-2 bg-white"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-800">
                  {c.commenterEmail || 'Anonymous'}
                </span>
                <span className="text-xs text-gray-500">
                  {formatDate(c.createdAt)}
                </span>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {c.comment}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

