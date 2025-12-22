// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { login } from "../api/auth";

const Login = () => {
  const { colors } = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      const res = await login(email, password);

      // 🔐 Сохраняем JWT токен
      localStorage.setItem("access", res.access);

      // 👤 Сохраняем инфо пользователя
      localStorage.setItem("user", JSON.stringify(res.user));

      navigate("/dashboard");
      window.location.reload(); // важно для Navbar
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 80px)",
        backgroundColor: colors.pageBg,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: colors.cardBg,
          borderRadius: "18px",
          padding: "32px",
          boxShadow: "0 18px 45px rgba(15,23,42,0.45)",
          color: colors.text,
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "8px", fontSize: "22px" }}>
          Log in
        </h2>

        <p
          style={{
            textAlign: "center",
            marginBottom: "24px",
            fontSize: "13px",
            opacity: 0.85,
          }}
        >
          Access your dashboard and thesis reports
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "13px" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "999px",
                border: "1px solid rgba(148,163,184,0.6)",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontSize: "13px" }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "999px",
                border: "1px solid rgba(148,163,184,0.6)",
                outline: "none",
              }}
            />
          </div>

          {error && (
            <p
              style={{
                color: "#f97373",
                fontSize: "12px",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px 18px",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              background: "linear-gradient(135deg, #fbbf24, #f97316)",
              color: "#111827",
              fontWeight: 600,
              fontSize: "14px",
              marginBottom: "14px",
            }}
          >
            Log in
          </button>
        </form>

        {/* 🔹 Ссылка на регистрацию */}
        <p style={{ textAlign: "center", fontSize: "13px", marginTop: "4px" }}>
          Don&apos;t have an account?{" "}
          <Link to="/signup" style={{ color: "#fbbf24" }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
