/**
 * API client for Mele-ekt CMS backend.
 * Blog fields match Mongoose BlogSchema: title, content, author (string), isFlagged, Date, _id.
 */

const API_BASE = '';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: token } : {};
}

/** Fetch all blogs (public, no auth). */
export async function fetchBlogsPublic() {
  const res = await fetch(`${API_BASE}/api/blogs/public`);
  if (!res.ok) throw new Error('Failed to fetch blogs');
  return res.json();
}

/** Fetch all blogs (authenticated). Returns blogs; use for dashboard blogCount. */
export async function fetchBlogs() {
  const res = await fetch(`${API_BASE}/api/blogs`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Failed to fetch blogs');
  return res.json();
}

/** Login; returns { token } on success. */
export async function login(email, password) {
  const res = await fetch(`${API_BASE}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Login failed');
  }
  const data = await res.json();
  if (data.token) localStorage.setItem('token', data.token);
  return data;
}

/** Decode JWT payload (no verify; for client-side email/role only). */
export function getPayloadFromToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

/** User's blog count: count of blogs where author === user email (BlogSchema.author is string). */
export function getBlogCountForUser(blogs, userEmail) {
  if (!userEmail) return 0;
  return blogs.filter((b) => String(b.author) === String(userEmail)).length;
}
