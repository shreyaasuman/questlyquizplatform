import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000, // prevent hanging requests
  headers: {
    "Content-Type": "application/json"
  }
});

// Attach JWT token automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 🔍 Helpful for debugging (safe to keep)
    console.log("API Request →", config.method?.toUpperCase(), config.url);

    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: log API errors clearly
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "API Error →",
      error.response?.status,
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

export default API;