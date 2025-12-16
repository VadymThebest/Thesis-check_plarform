// src/pages/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Signup = () => {
  const navigate = useNavigate();
  const { colors } = useTheme();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (!fullName || !email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    // Simülasyon: Kullanıcı kaydı başarılı → localStorage'a kaydediyoruz
    localStorage.setItem("authToken", "example_token");
    localStorage.setItem("userEmail", email);

    navigate("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: colors.pageBg,
        color: colors.text,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          width: "420px",
          backgroundColor: colors.cardBg,
          borderRadius: "16px",
          padding: "32px 36px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "8px" }}>Sign up</h2>
        <p style={{ textAlign: "center", opacity: 0.85, marginBottom: "24px" }}>
          Create your account.
        </p>

        <form onSubmit={handleSignup}>
          {/* Full Name */}
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Name Surname"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "6px",
              marginBottom: "16px",
              borderRadius: "10px",
              border: `1px solid ${colors.text}40`,
              backgroundColor: "transparent",
              color: colors.text,
            }}
          />

          {/* Email */}
          <label>Email Address</label>
          <input
            type="email"
            placeholder="name.surname@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "6px",
              marginBottom: "16px",
              borderRadius: "10px",
              border: `1px solid ${colors.text}40`,
              backgroundColor: "transparent",
              color: colors.text,
            }}
          />

          {/* Password */}
          <label>Password</label>
          <input
            type="password"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "6px",
              marginBottom: "16px",
              borderRadius: "10px",
              border: `1px solid ${colors.text}40`,
              backgroundColor: "transparent",
              color: colors.text,
            }}
          />

          {errorMessage && (
            <p style={{ color: "red", marginBottom: "12px", fontSize: "14px" }}>
              {errorMessage}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              marginTop: "4px",
              background:
                "linear-gradient(90deg, #ffb224, #ff8c00)",
              color: "#1a1a1a",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Create an account
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "15px",
            color: colors.text,
          }}
        >
          Already a member?{" "}
          <Link to="/login" style={{ color: "#ffb224" }}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
