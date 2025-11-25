import axios from "axios";

const rawBaseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
const normalizedBaseURL = rawBaseURL.endsWith("/") ? rawBaseURL : `${rawBaseURL}/`;

const apiClient = axios.create({
  baseURL: normalizedBaseURL,
  withCredentials: false,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;

