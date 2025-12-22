// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Signup = () => {
  const navigate = useNavigate();
  const { colors } = useTheme();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!fullName || !email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: fullName, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.detail || "Registration failed");
        return;
      }

      // 🔐 Сохраняем токены
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      // 👤 USER INFO
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.user.id,
          email: data.user.email,
          username: data.user.username,
          role: data.user.role || "student",
        })
      );

      navigate("/dashboard");
      window.location.reload();
    } catch (err) {
      setErrorMessage("Server error, try again later");
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: colors.pageBg, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ width: "420px", backgroundColor: colors.cardBg, borderRadius: "16px", padding: "32px 36px", boxShadow: "0 8px 32px rgba(0,0,0,0.25)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "8px" }}>Sign up</h2>
        <p style={{ textAlign: "center", opacity: 0.85, marginBottom: "24px" }}>Create your account.</p>

        <form onSubmit={handleSignup}>
          <label>Full Name</label>
          <input type="text" placeholder="Name Surname" value={fullName} onChange={(e) => setFullName(e.target.value)} style={{ width: "100%", padding: "12px", marginTop: "6px", marginBottom: "16px", borderRadius: "10px", border: `1px solid ${colors.text}40`, backgroundColor: "transparent", color: colors.text }} />

          <label>Email Address</label>
          <input type="email" placeholder="name.surname@university.edu" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: "12px", marginTop: "6px", marginBottom: "16px", borderRadius: "10px", border: `1px solid ${colors.text}40`, backgroundColor: "transparent", color: colors.text }} />

          <label>Password</label>
          <input type="password" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: "12px", marginTop: "6px", marginBottom: "16px", borderRadius: "10px", border: `1px solid ${colors.text}40`, backgroundColor: "transparent", color: colors.text }} />

          {errorMessage && <p style={{ color: "red", marginBottom: "12px", fontSize: "14px" }}>{errorMessage}</p>}

          <button type="submit" style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "none", cursor: "pointer", marginTop: "4px", background: "linear-gradient(90deg, #ffb224, #ff8c00)", color: "#1a1a1a", fontSize: "16px", fontWeight: "600" }}>
            Create an account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
