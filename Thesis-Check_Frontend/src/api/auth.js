import api from "./client";

export const login = async (email, password) => {
  // Django: /api/v1/token/
  const res = await api.post("/token/", { email, password });

  localStorage.setItem("access", res.data.access);
  localStorage.setItem("refresh", res.data.refresh);

  return res.data; // may include user
};

export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("userEmail");
};
