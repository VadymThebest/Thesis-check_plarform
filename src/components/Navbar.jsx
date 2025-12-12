// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoAnalytics from "./LogoAnalytics";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme, colors } = useTheme();

  // 🔑 Her render'da localStorage'dan oku
  const isLoggedIn = !!localStorage.getItem("authToken");
  const userEmail = localStorage.getItem("userEmail") || "";

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("fullName");
    navigate("/");
  };

  return (
    <header
      style={{
        width: "100%",
        padding: "16px 48px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxSizing: "border-box",
        backgroundColor: colors.navbarBg,
        color: colors.text,
        borderBottom: "1px solid rgba(255,255,255,0.15)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* SOL: Logo + isim */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <LogoAnalytics size={26} />
        <span
          style={{
            letterSpacing: "0.2em",
            fontSize: "14px",
            textTransform: "uppercase",
          }}
        >
          THESIS CHECK
        </span>
      </div>

      {/* ORTA: Menü */}
      <nav style={{ display: "flex", gap: "22px", fontSize: "14px" }}>
        <Link to="/" style={link(colors.text)}>
          Home
        </Link>
        <Link to="/about" style={link(colors.text)}>
          About
        </Link>
        <Link to="/upload" style={link(colors.text)}>
          Upload Thesis
        </Link>

        {/* 🔒 Login olduktan sonra görünenler */}
        {isLoggedIn && (
          <>
            <Link to="/dashboard" style={link(colors.text)}>
              Dashboard
            </Link>
            <Link to="/my-reports" style={link(colors.text)}>
              My Reports
            </Link>
            <Link to="/checks-history" style={link(colors.text)}>
              Checks History
            </Link>
            <Link to="/workspace" style={link(colors.text)}>
              Workspace
            </Link>
            <Link to="/report" style={link(colors.text)}>
              Report
            </Link>
            <Link to="/admin" style={link(colors.text)}>
              Admin Dashboard
            </Link>
            <Link to="/admin/stats" style={link(colors.text)}>
              Admin Stats
            </Link>
          </>
        )}
      </nav>

      {/* SAĞ: Tema switch + login/logout */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Tema butonu */}
        <button
          onClick={toggleTheme}
          style={{
            background: "transparent",
            border: "1px solid #fbbf24",
            padding: "6px 12px",
            borderRadius: "999px",
            color: "#fbbf24",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>

        {/* Kullanıcı maili */}
        {isLoggedIn && userEmail && (
          <span
            style={{
              fontSize: "12px",
              maxWidth: "200px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            title={userEmail}
          >
            {userEmail}
          </span>
        )}

        {/* Login / Logout butonu */}
        {!isLoggedIn ? (
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button style={btn}>LOG IN</button>
          </Link>
        ) : (
          <button onClick={logout} style={btn}>
            LOG OUT
          </button>
        )}
      </div>
    </header>
  );
};

const link = (color) => ({
  textDecoration: "none",
  color,
});

const btn = {
  background: "transparent",
  border: "1px solid #fbbf24",
  color: "#fbbf24",
  padding: "6px 16px",
  borderRadius: "20px",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: 500,
};

export default Navbar;
