// src/api.js
import axios from 'axios';

// Determine API URL based on environment
// 1️⃣ Use VITE_API_URL from environment variables if available
// 2️⃣ Fallback to localhost for local dev
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

console.log("Using API URL:", API_URL);

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  }
});

// Automatically attach token if available
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;