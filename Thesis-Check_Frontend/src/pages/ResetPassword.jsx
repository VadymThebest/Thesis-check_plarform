import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import client from "../api/client";

const ResetPassword = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <div style={container}>
      <h2>Reset password</h2>

      <form onSubmit={handleSubmit} style={form}>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={input}
        />

        <button type="submit" disabled={loading} style={button}>
          {loading ? "Saving..." : "Reset password"}
        </button>
      </form>

      {message && <p style={{ marginTop: "12px" }}>{message}</p>}
    </div>
  );
};

const container = {
  maxWidth: "400px",
  margin: "80px auto",
  padding: "24px",
};

const form = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const input = {
  padding: "10px",
  fontSize: "14px",
};

const button = {
  padding: "10px",
  fontSize: "14px",
  cursor: "pointer",
};

export default ResetPassword;
