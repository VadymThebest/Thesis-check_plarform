import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import client from "../api/client";

const ForgotPassword = () => {
  const { colors } = useTheme();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setMessage("");

    try {
      await client.post("/forgot-password/", { email });
      setMessage("If this email exists, a password reset link has been sent.");
    } catch (err) {
      setMessage("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page(colors)}>
      <div style={card(colors)}>
        <h2 style={title(colors)}>Forgot password</h2>
        <p style={subtitle(colors)}>
          Enter your email and we’ll send you a reset link.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label style={label(colors)}>Email</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={input}
            />
          </div>

          {message && (
            <p style={info}>
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={button(loading)}
          >
            {loading ? "Sending..." : "Send reset link"}
          </button>
        </form>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Link to="/login" style={link}>
            ← Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

/* ===== styles ===== */

const page = (colors) => ({
  minHeight: "calc(100vh - 71px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: colors.pageBg,
  padding: "0 16px",
});

const card = (colors) => ({
  width: "100%",
  maxWidth: "400px",
  background: colors.cardBg,
  borderRadius: "20px",
  padding: "30px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
  border: "1px solid rgba(255,255,255,0.05)",
});

const title = (colors) => ({
  textAlign: "center",
  margin: "0 0 8px 0",
  color: colors.text,
});

const subtitle = (colors) => ({
  textAlign: "center",
  opacity: 0.7,
  fontSize: "14px",
  margin: "0 0 24px 0",
  color: colors.text,
});

const label = (colors) => ({
  display: "block",
  marginBottom: "5px",
  fontSize: "13px",
  fontWeight: "700",
  color: colors.text,
  opacity: 0.9,
});

const input = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: "10px",
  border: "1px solid rgba(148,163,184,0.3)",
  background: "#fff",
  color: "#000",
  fontSize: "14px",
  boxSizing: "border-box",
  outline: "none",
};

const button = (loading) => ({
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  border: "none",
  background: loading ? "#ccc" : "#FFC531",
  fontWeight: "900",
  color: "#1a1a1a",
  cursor: loading ? "not-allowed" : "pointer",
  fontSize: "15px",
});

const info = {
  fontSize: "12px",
  marginBottom: "16px",
  textAlign: "center",
  opacity: 0.85,
};

const link = {
  color: "#fbbf24",
  fontWeight: "bold",
  textDecoration: "none",
  fontSize: "14px",
};

export default ForgotPassword;
