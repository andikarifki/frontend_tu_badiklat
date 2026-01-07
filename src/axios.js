import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Sesuaikan dengan URL Laravel kamu
});

// Otomatis kirim token jika ada di localStorage
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers.Accept = "application/json";
  return config;
});

export default instance;
