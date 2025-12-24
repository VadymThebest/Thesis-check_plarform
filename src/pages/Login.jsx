// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Login = () => {
  const { colors } = useTheme();
  const navigate = useNavigate();

  const [role, setRole] = useState("student"); // ✅ student | advisor
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    // ✅ UI-ready (backend yok): role bilgisini kaydet
    localStorage.setItem("authToken", "dummy-token");
    localStorage.setItem("userEmail", email);
    localStorage.setItem("role", role);

    navigate("/dashboard");
    window.location.reload();
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

        {/* ✅ ROLE SELECTOR */}
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
              tabIndex={0}
              onClick={() => setRole("student")}
              onKeyDown={(e) => e.key === "Enter" && setRole("student")}
              style={pill(role === "student")}
            >
              Student
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={() => setRole("advisor")}
              onKeyDown={(e) => e.key === "Enter" && setRole("advisor")}
              style={pill(role === "advisor")}
            >
              Advisor
            </div>
          </div>

          <div style={{ marginTop: "8px", fontSize: "12px", opacity: 0.75 }}>
            Selected role: <b style={{ opacity: 0.95 }}>{role}</b>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "14px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "13px",
                fontWeight: 900,
                opacity: 0.9,
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@university.edu"
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "999px",
                border: "1px solid rgba(148,163,184,0.6)",
                outline: "none",
                background: "rgba(255,255,255,0.95)",
              }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "13px",
                fontWeight: 900,
                opacity: 0.9,
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "999px",
                border: "1px solid rgba(148,163,184,0.6)",
                outline: "none",
                background: "rgba(255,255,255,0.95)",
              }}
            />

            {/* ✅ Forgot password link (password altı) */}
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
                }}
              >
                Forgot password?
              </button>
            </div>
          </div>

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

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: "999px",
              border: "none",
              background: "#FFC531",
              fontWeight: 900,
              cursor: "pointer",
              marginTop: "6px",
              color: "#1a1a1a",
            }}
          >
            Log in
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
          Don&apos;t have an account?{" "}
          <Link to="/signup" style={{ color: "#fbbf24", fontWeight: 900 }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
