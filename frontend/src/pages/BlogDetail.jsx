import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Heart, MessageCircle } from 'lucide-react';
import { blogService } from '../services/api';
import { getTokenPayload } from '../utils/auth';

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [actionError, setActionError] = useState(null);

  const me = useMemo(() => getTokenPayload(), []);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await blogService.getBlogById(id);
        setBlog(data);
        setEditTitle(data?.title || '');
        setEditContent(data?.content || '');
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

  const canEditOrDelete =
    !!token && (me?.role === 'admin' || (me?.id && blog?.authorId && me.id === blog.authorId));

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
    <div className="max-w-[720px] mx-auto px-4 py-10">
      <div className="mb-6">
        <p className="text-sm text-neutral-600 mb-1">
          {blog.author || 'Unknown Author'}
        </p>
        <p className="text-xs text-neutral-500">{formatDate(blog.Date)}</p>
      </div>

      {editMode ? (
        <div className="mb-6 space-y-3">
          {actionError && (
            <div className="bg-red-50 border border-red-200 text-red-800 text-sm rounded-lg px-3 py-2">
              {actionError}
            </div>
          )}
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows={10}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
          />
          <div className="flex gap-2">
            <button
              onClick={async () => {
                setActionError(null);
                try {
                  await blogService.updateBlog(blog._id, {
                    title: editTitle,
                    content: editContent,
                  });
                  const refreshed = await blogService.getBlogById(id);
                  setBlog(refreshed);
                  setEditMode(false);
                } catch (err) {
                  const msg =
                    err?.response?.data?.message ||
                    err?.response?.data?.error ||
                    err.message ||
                    'Failed to update blog';
                  setActionError(String(msg));
                }
              }}
              className="rounded-full bg-neutral-900 text-white px-4 py-2 text-sm font-semibold hover:bg-neutral-800"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditMode(false);
                setEditTitle(blog.title || '');
                setEditContent(blog.content || '');
                setActionError(null);
              }}
              className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <h1 className="font-serif text-[42px] leading-tight font-bold text-neutral-950">
            {blog.title}
          </h1>
          {canEditOrDelete && (
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() => {
                  setEditMode(true);
                  setActionError(null);
                }}
                className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
              >
                Edit
              </button>
              <button
                onClick={async () => {
                  const ok = window.confirm('Delete this blog post?');
                  if (!ok) return;
                  try {
                    await blogService.deleteBlog(blog._id);
                    navigate('/');
                  } catch (err) {
                    const msg =
                      err?.response?.data?.message ||
                      err?.response?.data?.error ||
                      err.message ||
                      'Failed to delete blog';
                    setActionError(String(msg));
                  }
                }}
                className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
              >
                Delete
              </button>
              {actionError && (
                <span className="text-sm text-red-700">{actionError}</span>
              )}
            </div>
          )}
        </div>
      )}

      <div className="flex items-center gap-6 text-sm text-neutral-600 mb-6">
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
        <div className="mb-4 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-900">
          ⚠️ This content has been flagged for review
        </div>
      )}

      {!editMode && (
        <div className="prose prose-lg max-w-none mb-10">
          <p className="text-neutral-800 leading-relaxed whitespace-pre-wrap">
            {blog.content}
          </p>
        </div>
      )}

      <section>
        <h2 className="font-semibold text-lg text-neutral-950 mb-3">
          Comments ({blog.comments?.length || 0})
        </h2>

        {!token ? (
          <div className="mb-4 rounded-lg border border-neutral-200 bg-white px-3 py-3 text-sm text-neutral-700">
            Login to write a comment.
          </div>
        ) : (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setActionError(null);
              if (!commentText.trim()) return;
              setCommentLoading(true);
              try {
                await blogService.addComment(blog._id, commentText.trim());
                setCommentText('');
                const refreshed = await blogService.getBlogById(id);
                setBlog(refreshed);
              } catch (err) {
                const msg =
                  err?.response?.data?.message ||
                  err?.response?.data?.error ||
                  err.message ||
                  'Failed to add comment';
                setActionError(String(msg));
              } finally {
                setCommentLoading(false);
              }
            }}
            className="mb-6"
          >
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={3}
              placeholder="Write a comment…"
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
            />
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-neutral-500">
                Be respectful. Engagement increases when you comment.
              </span>
              <button
                type="submit"
                disabled={commentLoading}
                className="rounded-full bg-neutral-900 text-white px-4 py-2 text-sm font-semibold hover:bg-neutral-800 disabled:opacity-60"
              >
                {commentLoading ? 'Posting…' : 'Post'}
              </button>
            </div>
          </form>
        )}

        {(!blog.comments || blog.comments.length === 0) && (
          <p className="text-sm text-gray-500">
            No comments yet.
          </p>
        )}

        <div className="space-y-4 mt-2">
          {blog.comments?.map((c, idx) => (
            <div
              key={idx}
              className="border border-neutral-200 rounded-lg px-3 py-3 bg-white"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-neutral-800">
                  {c.commenterEmail || 'Anonymous'}
                </span>
                <span className="text-xs text-neutral-500">
                  {formatDate(c.createdAt)}
                </span>
              </div>
              <p className="text-sm text-neutral-700 whitespace-pre-wrap">
                {c.comment}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

