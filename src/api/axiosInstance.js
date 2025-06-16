import axios from "axios";

// Create Axios instance with auth token if available
const axiosInstance = axios.create({
  baseURL: "https://jobtracker-backend-nx24.onrender.com/api", // Your Spring Boot backend
});

// Add JWT token to all requests if present
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
