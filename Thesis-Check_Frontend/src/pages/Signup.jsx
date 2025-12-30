import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext"; // Импортируем наш контекст

const Signup = () => {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const { login } = useAuth(); // Достаем функцию login

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    if (!fullName || !email || !password) {
      setErrorMessage("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username: fullName, // Django обычно ждет username
          email: email, 
          password: password 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.detail || "Registration failed. Check your data.");
        setLoading(false);
        return;
      }

      // ГЛАВНЫЙ МОМЕНТ:
      // Передаем данные в контекст. Функция login сама запишет всё в localStorage
      // и СРАЗУ обновит состояние всего приложения (Navbar, Sidebar и т.д.)
      login({
        access: data.access,
        refresh: data.refresh,
        user: {
          id: data.user.id,
          email: data.user.email,
          username: data.user.username,
          role: data.user.role || "student",
        }
      });

      // Теперь переходим в кабинет. React уже знает, что мы залогинены!
      navigate("/dashboard");
      
    } catch (err) {
      setErrorMessage("Server error. Is your Django running?");
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: colors.pageBg, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ width: "420px", backgroundColor: colors.cardBg, borderRadius: "16px", padding: "32px 36px", boxShadow: "0 8px 32px rgba(0,0,0,0.25)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "8px", color: colors.text }}>Sign up</h2>
        <p style={{ textAlign: "center", opacity: 0.85, marginBottom: "24px", color: colors.text }}>Create your account.</p>

        <form onSubmit={handleSignup}>
          <label style={{ color: colors.text }}>Full Name</label>
          <input 
            type="text" 
            placeholder="Name Surname" 
            value={fullName} 
            onChange={(e) => setFullName(e.target.value)} 
            style={{ width: "100%", padding: "12px", marginTop: "6px", marginBottom: "16px", borderRadius: "10px", border: `1px solid ${colors.text}40`, backgroundColor: "transparent", color: colors.text, boxSizing: "border-box" }} 
          />

          <label style={{ color: colors.text }}>Email Address</label>
          <input 
            type="email" 
            placeholder="name.surname@university.edu" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ width: "100%", padding: "12px", marginTop: "6px", marginBottom: "16px", borderRadius: "10px", border: `1px solid ${colors.text}40`, backgroundColor: "transparent", color: colors.text, boxSizing: "border-box" }} 
          />

          <label style={{ color: colors.text }}>Password</label>
          <input 
            type="password" 
            placeholder="******" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ width: "100%", padding: "12px", marginTop: "6px", marginBottom: "16px", borderRadius: "10px", border: `1px solid ${colors.text}40`, backgroundColor: "transparent", color: colors.text, boxSizing: "border-box" }} 
          />

          {errorMessage && <p style={{ color: "#ff4d4d", marginBottom: "12px", fontSize: "14px", fontWeight: "600" }}>{errorMessage}</p>}

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: "100%", 
              padding: "12px", 
              borderRadius: "10px", 
              border: "none", 
              cursor: loading ? "not-allowed" : "pointer", 
              marginTop: "4px", 
              background: loading ? "#ccc" : "linear-gradient(90deg, #ffb224, #ff8c00)", 
              color: "#1a1a1a", 
              fontSize: "16px", 
              fontWeight: "600" 
            }}
          >
            {loading ? "Registering..." : "Create an account"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "15px", color: colors.text }}>
          Already a member?{" "}
          <Link to="/login" style={{ color: "#ffb224", textDecoration: "none", fontWeight: "700" }}>Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;