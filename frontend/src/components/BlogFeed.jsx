import { useState, useEffect } from 'react';
import { Heart, MessageCircle } from 'lucide-react';

const BlogFeed = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/home');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
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
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="font-serif text-4xl font-bold text-gray-900 mb-2">
          Mele-ekt CMS
        </h1>
        <p className="text-gray-600">A community-driven blogging platform</p>
      </div>

      <div className="space-y-12">
        {blogs.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            No blogs available yet.
          </div>
        ) : (
          blogs.map((blog) => (
            <article
              key={blog._id}
              className="border-b border-gray-200 pb-12 last:border-b-0"
            >
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  {blog.author || 'Unknown Author'}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDate(blog.Date)}
                </p>
              </div>

              <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {blog.title}
              </h2>

              <div className="prose prose-lg max-w-none mb-6">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {blog.content}
                </p>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600">
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
              </div>

              {blog.isFlagged && (
                <div className="mt-4 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
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
