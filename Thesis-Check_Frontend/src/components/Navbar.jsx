import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import LogoMark from "./LogoMark.jsx";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isDark = theme === "dark";
  const isLoggedIn = isAuthenticated;
  const userEmail = user?.email || "";

  const navBg = isDark ? "rgba(2,20,52,0.96)" : "#FFC531";
  const textColor = isDark ? "#ffffff" : "#021434";
  const borderColor = isDark
    ? "rgba(255,255,255,0.15)"
    : "rgba(2,20,52,0.25)";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linkStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: textColor,
    fontWeight: 900,
    padding: "8px 14px",
    borderRadius: 999,
    border: isActive ? `1px solid ${borderColor}` : "1px solid transparent",
    background: isActive
      ? isDark
        ? "rgba(255,255,255,0.08)"
        : "rgba(2,20,52,0.10)"
      : "transparent",
    whiteSpace: "nowrap",
  });

  return (
    <>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 999,
          width: "100%",
          background: navBg,
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            gap: 12,
          }}
        >
          {/* LEFT */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => isLoggedIn && setSidebarOpen(true)}
              style={{
                border: `1px solid ${borderColor}`,
                background: "transparent",
                color: textColor,
                borderRadius: 12,
                padding: "8px 10px",
                cursor: isLoggedIn ? "pointer" : "default",
                fontWeight: 900,
              }}
              aria-label="Menu"
            >
              ☰
            </button>

            <div className="logo-wrap">
              <LogoMark height={44} showText />
            </div>
          </div>

          {/* CENTER (public, desktop only) */}
          {!isLoggedIn && (
            <div className="nav-center">
              <NavLink to="/" style={linkStyle}>Home</NavLink>
              <NavLink to="/about" style={linkStyle}>About</NavLink>
              <NavLink to="/contact" style={linkStyle}>Contact</NavLink>
            </div>
          )}

          {/* RIGHT */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {isLoggedIn && (
              <span
                style={{
                  fontSize: 13,
                  color: textColor,
                  maxWidth: 160,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontWeight: 600,
                }}
                title={userEmail}
              >
                {userEmail}
              </span>
            )}

            <button
              onClick={toggleTheme}
              style={{
                padding: "7px 12px",
                borderRadius: 999,
                border: `1px solid ${borderColor}`,
                background: "transparent",
                color: textColor,
                cursor: "pointer",
                fontWeight: 900,
              }}
            >
              {isDark ? "🌙" : "☀️"}
            </button>

            <button
              onClick={isLoggedIn ? handleLogout : () => navigate("/login")}
              style={{
                padding: "9px 16px",
                borderRadius: 999,
                background: isLoggedIn
                  ? isDark ? "#FFC531" : "#021434"
                  : "#021434",
                color: isLoggedIn
                  ? isDark ? "#021434" : "#ffffff"
                  : "#ffffff",
                border: "none",
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              {isLoggedIn ? "LOG OUT" : "LOG IN"}
            </button>
          </div>
        </div>
      </header>

      <style>{`
        @media (max-width: 768px) {
          .logo-wrap span {
            display: none;
          }
          .nav-center {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
