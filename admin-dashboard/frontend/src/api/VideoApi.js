// src/api/VideoApi.js
import axios from "axios";

// Prefer env var in prod, fallback to proxy in dev
const API_BASE =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) || "/api";

const api = axios.create({
  baseURL: `${API_BASE}/videos`,
  headers: { "Content-Type": "application/json" },
});

// ✅ Enhanced unwrap with response type check
const unwrap = (res) => {
  if (res && res.data) return res.data;
  throw new Error("Unexpected API response format");
};

// ✅ Central error handler with console logging
const onError = (err) => {
  console.error("API Error:", err); // Helps in debugging
  const message =
    err?.response?.data?.message ||
    err?.response?.data?.error ||
    err.message ||
    "Unknown error";
  throw new Error(message);
};

// ✅ Get videos with filters & pagination
export const getVideos = async (filters = {}, page = 1, limit = 5) => {
  try {
    const params = { ...filters, page, limit };
    const response = await api.get("/", { params });
    return {
      videos: response.data.videos ?? response.data ?? [],
      totalPages: response.data.totalPages ?? 1,
      currentPage: response.data.currentPage ?? 1,
      total: response.data.total ?? response.data.videos?.length ?? 0,
    };
  } catch (err) {
    onError(err);
  }
};

// ✅ Get single video by ID
export const getVideoById = async (id) => {
  try {
    const res = await api.get(`/${id}`);
    return unwrap(res);
  } catch (err) {
    onError(err);
  }
};

// ✅ Create a new video
export const createVideo = async (video) => {
  try {
    const res = await api.post("/", video);
    return unwrap(res);
  } catch (err) {
    onError(err);
  }
};

// ✅ Update a video by ID
export const updateVideo = async (id, video) => {
  try {
    const res = await api.put(`/${id}`, video);
    return unwrap(res);
  } catch (err) {
    onError(err);
  }
};

// ✅ Delete a video by ID
export const deleteVideo = async (id) => {
  try {
    const res = await api.delete(`/${id}`);
    return unwrap(res);
  } catch (err) {
    onError(err);
  }
};
