// src/api/auth.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ---- Keys ----
const TOKEN_KEY = "token";
const USER_KEY = "user";

// ---- Axios instance ----
export const api = axios.create({
  baseURL: BASE_URL,
});

// ---- Small helpers ----
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const decodeJwt = (token) => {
  try {
    const [, payload] = token.split(".");
    // handle URL-safe base64
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(normalized)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
};

export const isTokenExpired = (token = getToken()) => {
  if (!token) return true;
  const payload = decodeJwt(token);
  if (!payload?.exp) return false; // if your backend doesn't set exp, treat as non-expiring
  const now = Math.floor(Date.now() / 1000);
  return payload.exp <= now;
};

export const saveAuth = ({ token, user }) => {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  if (isTokenExpired(token)) {
    clearAuth();
    return false;
  }
  return true;
};

/**
 * Call this **once on app start** (e.g., inside App.jsx useEffect)
 * to purge bad/expired tokens so you never need to manually clear localStorage.
 */
export const initAuth = () => {
  const token = getToken();
  if (!token || token === "undefined" || token === "null" || isTokenExpired(token)) {
    clearAuth();
  }
};

// ---- Axios interceptors ----
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token && !isTokenExpired(token)) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      // Token invalid/expired on the server side
      clearAuth();
      // Optional: hard redirect
      // window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

// ---- API calls ----
export const signup = (payload) => api.post("/api/auth/signup", payload);

export const login = async (payload) => {
  const { data } = await api.post("/api/auth/login", payload);
  // Expecting { token, user } from backend
  saveAuth(data);
  return data;
};

// Optional: get current user using token
export const me = () => api.get("/api/auth/me");
