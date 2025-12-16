// src/pages/Contact.jsx
import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const Contact = () => {
  const { colors } = useTheme();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent!");
  };

  return (
    <div
      style={{
        backgroundColor: colors.pageBg,
        color: colors.text,
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>Contact Us</h1>

        <p style={{ opacity: 0.8, marginBottom: "40px", maxWidth: "650px" }}>
          Have questions, feedback or requests? Send us a message and we will
          get back to you within 24 hours.
        </p>

        {/* CONTACT FORM */}
        <div
          style={{
            backgroundColor: colors.cardBg,
            padding: "30px",
            borderRadius: "16px",
            border: `1px solid ${colors.text}25`,
            boxShadow: "0 8px 28px rgba(0,0,0,0.25)",
          }}
        >
          <form onSubmit={handleSubmit}>
            <label style={labelStyle}>Full Name</label>
            <input
              name="name"
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              style={inputStyle(colors)}
              required
            />

            <label style={labelStyle}>Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="email@university.edu"
              value={form.email}
              onChange={handleChange}
              style={inputStyle(colors)}
              required
            />

            <label style={labelStyle}>Message</label>
            <textarea
              name="message"
              placeholder="How can we help you?"
              value={form.message}
              onChange={handleChange}
              style={{
                ...inputStyle(colors),
                minHeight: "140px",
                resize: "vertical",
              }}
              required
            />

            <button
              type="submit"
              style={{
                marginTop: "20px",
                width: "100%",
                padding: "12px",
                backgroundColor: "#fbbf24",
                border: "none",
                color: "#1a1a1a",
                borderRadius: "12px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: 600,
              }}
            >
              Send Message
            </button>
          </form>
        </div>

        {/* INFO BOX */}
        <div
          style={{
            marginTop: "40px",
            backgroundColor: colors.cardBg,
            padding: "20px",
            borderRadius: "16px",
            border: `1px solid ${colors.text}20`,
          }}
        >
          <h3 style={{ marginBottom: "8px" }}>Contact Information</h3>

          <p style={{ opacity: 0.7 }}>
            Email: <strong>support@thesischeck.com</strong>
          </p>
          <p style={{ opacity: 0.7 }}>Mon–Fri · 09:00–18:00</p>
        </div>
      </div>
    </div>
  );
};

// STYLES
const labelStyle = {
  display: "block",
  marginBottom: "6px",
  marginTop: "16px",
  fontSize: "15px",
};

const inputStyle = (colors) => ({
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: `1px solid ${colors.text}40`,
  backgroundColor: "transparent",
  color: colors.text,
  fontSize: "15px",
});

export default Contact;
