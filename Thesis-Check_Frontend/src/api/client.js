import axios from "axios";

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  }

  return config;
});

export default client;
