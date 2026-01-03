import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext"; // Импортируем хук авторизации

// 1. Конфигурация меню для каждой роли на основе твоих требований
const ROLE_MENU_CONFIG = {
  student: [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/workspace", label: "Workspace" },
    { to: "/my-reports", label: "My Reports" },
    { to: "/report", label: "Report" },
    { to: "/history", label: "Checks History" },
  ],
  advisor: [
    { to: "/admin-dashboard", label: "Admin Dashboard" },
    { to: "/admin-stats", label: "Admin Stats" },
    { to: "/advisor-dashboard", label: "Advisor Dashboard" },
  ],
  admin: [
    { to: "/admin-panel", label: "Full System Admin" },
    { to: "/users", label: "Manage Users" },
  ],
};

const Sidebar = ({ isOpen, onClose, isLoggedIn }) => {
  const { theme, colors } = useTheme();
  const { user } = useAuth(); // Получаем объект юзера из контекста
  const isDark = theme === "dark";
  const navHeight = "71px";

  // Блокировка скролла
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  // Определяем роль. В твоей модели Django это поле 'role'
  // По умолчанию ставим 'student', если данных еще нет
  const userRole = user?.role || "student";
  const menuLinks = ROLE_MENU_CONFIG[userRole] || ROLE_MENU_CONFIG.student;

  const bg = isDark ? "rgba(2,20,52,0.98)" : "#ffffff";

  return (
    <>
      {isOpen && (
        <div onClick={onClose} style={overlayStyle(navHeight)} />
      )}

      <aside style={sidebarContainerStyle(isOpen, navHeight, bg, isDark)}>
        <div style={{ flex: 1, padding: "20px 16px", overflowY: "auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            
            {/* Публичные ссылки */}
            <NavLink to="/" style={linkStyle(isDark, colors)} onClick={onClose}>Home</NavLink>
            <NavLink to="/about" style={linkStyle(isDark, colors)} onClick={onClose}>About</NavLink>
            <NavLink to="/contact" style={linkStyle(isDark, colors)} onClick={onClose}>Contact</NavLink>

            {/* Ссылки Личного Кабинета */}
            {isLoggedIn && (
              <>
                <div style={sectionHeaderStyle(colors)}>
                  {userRole} Menu
                </div>

                {menuLinks.map((link) => (
                  <NavLink 
                    key={link.to} 
                    to={link.to} 
                    style={linkStyle(isDark, colors)} 
                    onClick={onClose}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Кнопка закрытия */}
        <div style={{ padding: "16px" }}>
          <button onClick={onClose} style={closeButtonStyle(isDark, colors)}>
            ✕ Close Menu
          </button>
        </div>
      </aside>
    </>
  );
};

// --- Стили ---
const linkStyle = (isDark, colors) => ({ isActive }) => ({
  display: "block",
  textDecoration: "none",
  color: colors.text,
  fontWeight: isActive ? 900 : 600,
  padding: "12px 18px",
  borderRadius: "10px",
  background: isActive ? (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)") : "transparent",
  transition: "0.2s"
});

const sidebarContainerStyle = (isOpen, navHeight, bg, isDark) => ({
  position: "fixed",
  top: navHeight, 
  left: 0,
  width: "260px",
  height: `calc(100vh - ${navHeight})`, 
  zIndex: 991,
  background: bg,
  borderRight: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(2,20,52,0.1)"}`,
  transform: isOpen ? "translateX(0)" : "translateX(-100%)",
  transition: "transform 0.3s ease-in-out",
  display: "flex",
  flexDirection: "column",
});

const sectionHeaderStyle = (colors) => ({
  margin: "20px 18px 10px", 
  fontSize: "11px", 
  fontWeight: 800, 
  opacity: 0.4, 
  textTransform: "uppercase",
  color: colors.text 
});

const overlayStyle = (navHeight) => ({
  position: "fixed",
  top: navHeight,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.2)",
  backdropFilter: "blur(2px)",
  zIndex: 990,
});

const closeButtonStyle = (isDark, colors) => ({
  width: "100%",
  padding: "10px",
  background: isDark ? "rgba(255,255,255,0.05)" : "#f5f5f5",
  border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: 700,
  color: colors.text,
});

export default Sidebar;