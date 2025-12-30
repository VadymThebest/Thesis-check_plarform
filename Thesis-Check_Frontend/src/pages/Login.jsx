import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import client from "../api/client";

const Login = () => {
  const { colors } = useTheme();
  const { login } = useAuth(); // Логика авторизации из контекста
  const navigate = useNavigate();

  const [role, setRole] = useState("student"); // student | advisor
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError("");
    setLoading(true);

    try {
      // Отправляем запрос на бэкенд (логика из твоего старого кода)
      const res = await client.post("token/", {
        email,
        password,
        expected_role: role,
      });

      // Сохраняем данные в AuthContext
      login({
        access: res.data.access,
        refresh: res.data.refresh,
        user: res.data.user,
      });

      // Редирект на дашборд
      navigate("/dashboard", { replace: true });
    } catch (err) {
      if (err.response?.status === 403) {
        setError(err.response.data.detail);
      } else {
        setError("Invalid email or password");
      }
    } finally {
      setLoading(false);
    }
  };

  const pill = (active) => ({
    padding: "10px 14px",
    borderRadius: "999px",
    border: active
      ? "1px solid rgba(255,191,36,0.9)"
      : "1px solid rgba(148,163,184,0.35)",
    background: active ? "rgba(255,191,36,0.12)" : "transparent",
    color: colors.text,
    cursor: "pointer",
    fontWeight: 900,
    fontSize: "13px",
    flex: 1,
    textAlign: "center",
    userSelect: "none",
    transition: "all 0.2s ease",
  });

  return (
    <div
      style={{
        minHeight: "calc(100vh - 90px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        boxSizing: "border-box",
        color: colors.text,
        background: colors.pageBg,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: colors.cardBg,
          borderRadius: "18px",
          padding: "34px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <h2 style={{ textAlign: "center", margin: 0, marginBottom: "6px" }}>
          Log in
        </h2>
        <p
          style={{
            textAlign: "center",
            opacity: 0.8,
            fontSize: "13px",
            marginTop: 0,
            marginBottom: "18px",
            lineHeight: 1.5,
          }}
        >
          Choose your role and access your checks, reports and dashboard.
        </p>

        {/* ROLE SELECTOR */}
        <div style={{ marginBottom: "18px" }}>
          <div
            style={{
              fontSize: "13px",
              fontWeight: 900,
              marginBottom: "8px",
              opacity: 0.9,
            }}
          >
            Login as
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "10px",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(0,0,0,0.08)",
            }}
          >
            <div
              role="button"
              onClick={() => setRole("student")}
              style={pill(role === "student")}
            >
              Student
            </div>

            <div
              role="button"
              onClick={() => setRole("advisor")}
              style={pill(role === "advisor")}
            >
              Advisor
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div style={{ marginBottom: "14px" }}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@university.edu"
              required
              style={inputStyle}
            />
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: "10px" }}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={inputStyle}
            />

            {/* Forgot password */}
            <div style={{ textAlign: "right", marginTop: "8px" }}>
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  color: "#fbbf24",
                  fontWeight: 900,
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontSize: "12px",
                }}
              >
                Forgot password?
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <p
              style={{
                color: "#f97373",
                fontSize: "12px",
                marginBottom: "10px",
                textAlign: "center",
                fontWeight: 800,
              }}
            >
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: "999px",
              border: "none",
              background: loading ? "#d1d5db" : "#FFC531",
              fontWeight: 900,
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: "6px",
              color: "#1a1a1a",
              transition: "transform 0.1s ease",
            }}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            fontSize: "13px",
            opacity: 0.85,
            marginTop: "14px",
          }}
        >
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#fbbf24", fontWeight: 900 }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontSize: "13px",
  fontWeight: 900,
  opacity: 0.9,
};

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "999px",
  border: "1px solid rgba(148,163,184,0.6)",
  outline: "none",
  background: "rgba(255,255,255,0.95)",
  color: "#1a1a1a", // Текст в инпуте всегда темный для читаемости
  boxSizing: "border-box",
};

export default Login;