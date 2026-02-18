import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const blogService = {
  getAllBlogs: async () => {
    const response = await api.get('/home');
    return response.data;
  },
  getBlogById: async (id) => {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
  },
  createBlog: async ({ title, content }) => {
    const response = await api.post('/blogs', { title, content });
    return response.data;
  },
};

export const adminService = {
  getAllUsers: async () => {
    const response = await api.get('/admin_dashboard');
    return response.data;
  },
  getFlaggedBlogs: async () => {
    const response = await api.get('/admin_flagged_blogs');
    return response.data;
  },
};

export const authService = {
  login: async ({ email, password }) => {
    const response = await api.post('/login', { email, password });
    return response.data; // {token, message}
  },
  register: async ({ user_id, email, password }) => {
    const response = await api.post('/sign_up', { user_id, email, password });
    return response.data;
  },
};

export default api;
