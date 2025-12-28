// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();

  const roleBadgeColor = {
    student: "#38bdf8",
    advisor: "#a78bfa",
    admin: "#f87171",
  };

  return (
    <nav
      style={{
        padding: "14px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#020c1b",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* LEFT */}
      <Link
        to="/"
        style={{
          fontWeight: 700,
          fontSize: "18px",
          color: "#fbbf24",
          textDecoration: "none",
        }}
      >
        THESIS CHECK
      </Link>

      {/* CENTER */}
      <div style={{ display: "flex", gap: "18px", alignItems: "center" }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/about" style={linkStyle}>About</Link>
        <Link to="/contact" style={linkStyle}>Contact</Link>
      </div>

      {/* RIGHT */}
      <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
        <button onClick={toggleTheme} style={themeBtn}>
          🌙 Light
        </button>

        {!isAuthenticated ? (
          <Link to="/login" style={loginBtn}>
            Log in
          </Link>
        ) : (
          <>
            {/* Dashboard */}
            <Link to="/dashboard" style={linkStyle}>
              Dashboard
            </Link>

            {/* Upload Thesis */}
            <Link
              to="/upload"
              style={{
                background: "#fbbf24",
                color: "#111827",
                padding: "6px 14px",
                borderRadius: "999px",
                fontWeight: 600,
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              Upload Thesis
            </Link>

            {/* USER INFO */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "13px", opacity: 0.85 }}>
                {user?.email || "Unknown"}
              </span>

              <span
                style={{
                  fontSize: "11px",
                  padding: "2px 8px",
                  borderRadius: "999px",
                  backgroundColor:
                    roleBadgeColor[user?.role] || "#64748b",
                  color: "#020617",
                  fontWeight: 600,
                }}
              >
                {user?.role ? user.role.toUpperCase() : "STUDENT"}
              </span>
            </div>

            <button onClick={logout} style={logoutBtn}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

const linkStyle = {
  color: "#e5e7eb",
  textDecoration: "none",
  fontSize: "14px",
};

const loginBtn = {
  color: "#fbbf24",
  border: "1px solid #fbbf24",
  padding: "6px 14px",
  borderRadius: "999px",
  textDecoration: "none",
  fontSize: "14px",
};

const logoutBtn = {
  background: "transparent",
  border: "1px solid #f87171",
  color: "#f87171",
  padding: "6px 14px",
  borderRadius: "999px",
  cursor: "pointer",
  fontSize: "14px",
};

const themeBtn = {
  background: "transparent",
  border: "1px solid rgba(255,255,255,0.2)",
  color: "#e5e7eb",
  padding: "6px 12px",
  borderRadius: "999px",
  cursor: "pointer",
  fontSize: "13px",
};

export default Navbar;
