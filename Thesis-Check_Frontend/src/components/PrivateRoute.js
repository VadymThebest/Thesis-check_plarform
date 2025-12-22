import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("access");
  const user = localStorage.getItem("user");

  if (!token || !user) return <Navigate to="/login" replace />;

  try {
    JSON.parse(user); // проверка, что user валидный JSON
  } catch {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
