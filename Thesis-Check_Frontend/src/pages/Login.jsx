import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import client from "../api/client";

const Login = () => {
  const { colors } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();

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
      // Теперь просто отправляем данные для получения токена
      const res = await client.post("token/", {
        email,
        password,
      });

      // Сохраняем пользователя (роль подтянется автоматически из res.data.user)
      login({
        access: res.data.access,
        refresh: res.data.refresh,
        user: res.data.user,
      });

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "calc(100vh - 71px)", // Синхронизировано с высотой навбара
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: colors.pageBg,
      padding: "0 16px"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "400px",
        background: colors.cardBg,
        borderRadius: "20px",
        padding: "30px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        border: "1px solid rgba(255,255,255,0.05)",
      }}>
        <h2 style={{ textAlign: "center", margin: "0 0 8px 0", color: colors.text }}>Log in</h2>
        <p style={{ 
          textAlign: "center", 
          opacity: 0.7, 
          fontSize: "14px", 
          margin: "0 0 24px 0",
          color: colors.text 
        }}>
          Enter your credentials to access your account.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle(colors)}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle(colors)}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={inputStyle}
            />
          </div>

          {error && (
            <p style={{ color: "#f97373", fontSize: "12px", marginBottom: "16px", textAlign: "center", fontWeight: "bold" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "12px",
              border: "none",
              background: loading ? "#ccc" : "#FFC531",
              fontWeight: "900",
              color: "#1a1a1a",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "15px"
            }}
          >
            {loading ? "Please wait..." : "Log in"}
          </button>
        </form>

        <div style={{ marginTop: "20px", textAlign: "center", fontSize: "14px" }}>
          <span style={{ opacity: 0.7, color: colors.text }}>Don't have an account? </span>
          <Link to="/signup" style={{ color: "#fbbf24", fontWeight: "bold", textDecoration: "none" }}>
            Sign up
          </Link>
        </div>
        
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <button
            onClick={() => navigate("/forgot-password")}
            style={{ background: "none", border: "none", color: "#fbbf24", fontSize: "12px", cursor: "pointer" }}
          >
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  );
};

const labelStyle = (colors) => ({
  display: "block",
  marginBottom: "5px",
  fontSize: "13px",
  fontWeight: "700",
  color: colors.text,
  opacity: 0.9,
});

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: "10px",
  border: "1px solid rgba(148,163,184,0.3)",
  background: "#fff",
  color: "#000",
  fontSize: "14px",
  boxSizing: "border-box",
  outline: "none"
};

export default Login;