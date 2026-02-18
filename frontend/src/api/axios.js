import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Your backend URL
});

// This interceptor handles the "Header" part for you
api.interceptors.request.use((config) => {
    // 1. Grab the token from storage
    const token = localStorage.getItem('token');
    
    // 2. If it exists, put it in the Header
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;