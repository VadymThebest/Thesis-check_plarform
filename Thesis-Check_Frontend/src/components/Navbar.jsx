import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import LogoMark from "./LogoMark.jsx";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Берем ВСЁ из контекста. Это наш единственный источник правды!
  const { isAuthenticated, user, logout } = useAuth();

  // Теперь нам не нужны ручные проверки localStorage. 
  // Используем isAuthenticated из AuthContext.
  const isLoggedIn = isAuthenticated; 
  const userEmail = user?.email || "";
  
  // Роль тоже берем из объекта юзера, который мы передали в login()
  const role = (user?.role || "student").toLowerCase();
  const isAdvisor = role === "advisor" || role === "teacher";
  const isAdmin = role === "admin";

  const handleLogout = () => {
    logout(); // Эта функция из контекста уже очищает localStorage и сбрасывает стейт
    navigate("/");
  };

  const isDark = theme === "dark";

  // Navbar theme
  const navBg = isDark ? "rgba(2,20,52,0.96)" : "#FFC531";
  const textColor = isDark ? "#ffffff" : "#021434";
  const borderColor = isDark ? "rgba(255,255,255,0.15)" : "rgba(2,20,52,0.25)";

  // Динамические ссылки для сайдбара
  let roleLinks = [];
  if (isAdmin) {
    roleLinks = [
      { to: "/admin/dashboard", label: "Admin Dashboard" },
      { to: "/admin/stats", label: "Admin Stats" },
    ];
  } else if (isAdvisor) {
    roleLinks = [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/checks-history", label: "History" },
      { to: "/workspace", label: "Workspace" },
    ];
  } else {
    roleLinks = [
      { to: "/upload", label: "Upload Thesis" },
      { to: "/dashboard", label: "Dashboard" },
      { to: "/my-reports", label: "My Reports" },
    ];
  }

  const linkStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: textColor,
    fontWeight: 900,
    padding: "8px 14px",
    borderRadius: "999px",
    border: isActive ? `1px solid ${borderColor}` : "1px solid transparent",
    background: isActive ? (isDark ? "rgba(255,255,255,0.08)" : "rgba(2,20,52,0.10)") : "transparent",
    whiteSpace: "nowrap",
  });

  const Brand = () => (
    <div
      onClick={() => navigate("/")}
      style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
    >
      <LogoMark size={44} />
      {/* Если хочешь надпись рядом с лого — раскомментируй */}
      {/* <span style={{ fontWeight: 900, color: textColor }}>THESIS CHECK</span> */}
    </div>
  );

  return (
    <>
      {/* Сайдбар теперь управляется состоянием контекста */}
      {isLoggedIn && (
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isLoggedIn={isLoggedIn}
          roleLinks={roleLinks}
        />
      )}

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 999,
          width: "100%",
          background: navBg,
          borderBottom: `1px solid ${borderColor}`,
          transition: "background 0.3s ease",
        }}
      >
        <div
          style={{
            width: "100%",
            padding: "12px 24px",
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            alignItems: "center",
            gap: 12,
            boxSizing: "border-box",
          }}
        >
          {/* LEFT: Бургер или Лого */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {isLoggedIn ? (
              <button
                onClick={() => setSidebarOpen(true)}
                style={{
                  border: `1px solid ${borderColor}`,
                  background: isDark ? "transparent" : "rgba(255,255,255,0.35)",
                  color: textColor,
                  borderRadius: 12,
                  padding: "8px 10px",
                  cursor: "pointer",
                  fontWeight: 900,
                }}
              >
                ☰
              </button>
            ) : (
              <Brand />
            )}
          </div>

          {/* CENTER: Публичные ссылки или Логоцентр */}
          <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
            {!isLoggedIn ? (
              <>
                <NavLink to="/" style={linkStyle}>Home</NavLink>
                <NavLink to="/about" style={linkStyle}>About</NavLink>
                <NavLink to="/contact" style={linkStyle}>Contact</NavLink>
              </>
            ) : (
              <Brand />
            )}
          </div>

          {/* RIGHT: Email, Тема и Кнопка Auth */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "flex-end" }}>
            {isLoggedIn && (
              <span
                style={{
                  fontSize: 13,
                  color: textColor,
                  opacity: 0.9,
                  maxWidth: 150,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontWeight: 600
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
                borderRadius: "999px",
                border: `1px solid ${borderColor}`,
                background: isDark ? "transparent" : "rgba(255,255,255,0.35)",
                color: textColor,
                cursor: "pointer",
                fontWeight: 900,
              }}
            >
              {isDark ? "🌙 Dark" : "☀️ Light"}
            </button>

            <button
              onClick={isLoggedIn ? handleLogout : () => navigate("/login")}
              style={{
                padding: "9px 16px",
                borderRadius: "999px",
                background: isLoggedIn ? (isDark ? "#FFC531" : "#021434") : "#021434",
                color: isLoggedIn ? (isDark ? "#021434" : "#ffffff") : "#ffffff",
                border: "none",
                fontWeight: 950,
                cursor: "pointer",
              }}
            >
              {isLoggedIn ? "LOG OUT" : "LOG IN"}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;