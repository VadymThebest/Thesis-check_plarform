import React, { useState } from "react";
import client from "../api/client";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await client.post("/forgot-password/", { email });
      setMessage(
        "If this email exists, a password reset link has been sent."
      );
    } catch (err) {
      setMessage("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <h2>Forgot password</h2>

      <form onSubmit={handleSubmit} style={form}>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={input}
        />

        <button type="submit" disabled={loading} style={button}>
          {loading ? "Sending..." : "Send reset link"}
        </button>
      </form>

      {message && <p style={{ marginTop: "12px" }}>{message}</p>}

      <Link to="/login" style={{ marginTop: "16px", display: "inline-block" }}>
        ← Back to login
      </Link>
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

export default ForgotPassword;
