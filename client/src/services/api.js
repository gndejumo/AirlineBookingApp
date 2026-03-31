import axios from 'axios';

console.log("ALL ENV:", import.meta.env);
console.log("API URL:", import.meta.env.VITE_API_URL);

const api = axios.create ({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

console.log("Axios Base URL:", api.defaults.baseURL);
// Automatic attach token if available
api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});




export default api;