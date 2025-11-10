// src/api/axiosInstance.ts
import axios from 'axios';

// IMPORTANT: Replace this URL with the actual address and port of your backend server!
// Example: If your backend runs on port 8080, use http://localhost:8080
const BASE_URL = 'http://localhost:5000'; 

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Optional: Add an interceptor to include the auth token in requests
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken'); // Assuming you store the token here
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;