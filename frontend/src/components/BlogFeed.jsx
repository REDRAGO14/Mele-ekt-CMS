import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle } from 'lucide-react';
import { blogService } from '../services/api';

const BlogFeed = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await blogService.getAllBlogs();
        setBlogs(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const excerpt = (text, max = 220) => {
    const t = (text || '').trim();
    if (t.length <= max) return t;
    return `${t.slice(0, max).trim()}…`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500">Loading blogs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-[720px] mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="font-serif text-[42px] leading-tight font-bold text-neutral-950">
          Home
        </h1>
        <p className="text-neutral-600 mt-2">
          Stories ranked by engagement.
        </p>
      </div>

      <div className="divide-y divide-neutral-200">
        {blogs.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            No blogs available yet.
          </div>
        ) : (
          blogs.map((blog) => (
            <article
              key={blog._id}
              className="py-8"
            >
              <div className="mb-3">
                <p className="text-sm text-neutral-700">
                  {blog.author || 'Unknown Author'}
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  {formatDate(blog.Date)}
                </p>
              </div>

              <Link to={`/blog/${blog._id}`}>
                <h2 className="font-serif text-3xl font-bold text-neutral-950 leading-tight hover:underline">
                  {blog.title}
                </h2>
              </Link>

              <p className="text-neutral-700 mt-3 leading-relaxed">
                {excerpt(blog.content)}
              </p>

              <div className="flex items-center gap-6 text-sm text-neutral-600 mt-4">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span>{blog.Engagement || 0}</span>
                </div>
                {blog.blogComments && blog.blogComments.length > 0 && (
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>{blog.blogComments.length}</span>
                  </div>
                )}
                <Link
                  to={`/blog/${blog._id}`}
                  className="ml-auto text-sm font-medium text-neutral-900 hover:underline"
                >
                  Read →
                </Link>
              </div>

              {blog.isFlagged && (
                <div className="mt-4 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-900">
                  ⚠️ This content has been flagged for review
                </div>
              )}
            </article>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogFeed;
