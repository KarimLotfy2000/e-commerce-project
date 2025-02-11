import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error("Network error or CORS issue:", error);
      alert(
        "Unable to connect to the server. Please check your internet connection or try again later."
      );
      return Promise.reject(error);
    }

    const status = error.response.status;

    if (status === 401) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("openLoginModal", "true");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("totalItems");
        window.location.href = "/";
      }
    } else if (status === 403) {
      console.warn(
        "403 Forbidden: Backend might be down or access is restricted."
      );
      alert(
        "Access denied. This may be due to a server issue or permission restrictions."
      );
    } else if (status >= 500) {
      console.error("Server error:", error);
      alert("A server error occurred. Please try again later.");
    }

    return Promise.reject(error);
  }
);

export default api;
