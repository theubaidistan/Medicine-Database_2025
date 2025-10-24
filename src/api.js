// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://localhost:44367/api/", // adjust to your API
});

// attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
