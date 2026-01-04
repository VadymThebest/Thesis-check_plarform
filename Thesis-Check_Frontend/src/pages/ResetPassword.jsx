import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import client from "../api/client";

const ResetPassword = () => {
  const { colors } = useTheme();
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setMessage("");

    try {
      await client.post(`/reset-password/${uid}/${token}/`, {
        password,
      });

      setMessage("Password reset successful. Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage("Invalid or expired link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page(colors)}>
      <div style={card(colors)}>
        <h2 style={title(colors)}>Reset password</h2>
        <p style={subtitle(colors)}>
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label style={label(colors)}>New password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            {loading ? "Saving..." : "Reset password"}
          </button>
        </form>
      </div>
    </div>
  );
};

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

export default ResetPassword;
