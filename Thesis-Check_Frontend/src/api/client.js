import axios from "axios";

const client = axios.create({
  baseURL: "/api/v1/",
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;
