import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import client from "../api/client";

const Login = () => {
  const { colors } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState("student");
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
      const res = await client.post("token/", {
        email,
        password,
        expected_role: role,
      });

      login({
        access: res.data.access,
        refresh: res.data.refresh,
        user: res.data.user,
      });

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
    border: active ? "1px solid #fbbf24" : "1px solid #64748b",
    background: active ? "rgba(251,191,36,0.15)" : "transparent",
    cursor: "pointer",
    fontWeight: 800,
    flex: 1,
    textAlign: "center",
  });

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: 420, padding: 32, background: colors.cardBg, borderRadius: 16 }}>
        <h2 style={{ textAlign: "center" }}>Log in</h2>

        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          <div style={pill(role === "student")} onClick={() => setRole("student")}>Student</div>
          <div style={pill(role === "advisor")} onClick={() => setRole("advisor")}>Advisor</div>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />

          {error && <p style={{ color: "#f87171", textAlign: "center" }}>{error}</p>}

          <button type="submit" disabled={loading} style={submitBtn}>
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 12 }}>
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: 999,
  border: "1px solid #94a3b8",
  marginBottom: 12,
};

const submitBtn = {
  width: "100%",
  padding: 12,
  borderRadius: 999,
  background: "#fbbf24",
  border: "none",
  fontWeight: 800,
};

export default Login;
