import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const PUBLIC_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const ROLE_MENU_CONFIG = {
  student: [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/workspace", label: "Workspace" },
    { to: "/my-reports", label: "My Reports" },
    { to: "/history", label: "Checks History" },
  ],
  advisor: [
    { to: "/advisor-dashboard", label: "Advisor Dashboard" },
    { to: "/admin-stats", label: "Statistics" },
  ],
  admin: [
    { to: "/admin-panel", label: "Admin Panel" },
    { to: "/users", label: "Manage Users" },
  ],
};

const Sidebar = ({ isOpen, onClose }) => {
  const { theme, colors } = useTheme();
  const { user } = useAuth();

  const isDark = theme === "dark";
  const isLoggedIn = !!user;
  const userRole = (user?.role || "student").toLowerCase();
  const menuLinks = ROLE_MENU_CONFIG[userRole] || [];

  const navHeight = "71px";
  const bg = isDark ? "rgba(2,20,52,0.98)" : "#ffffff";

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  return (
    <>
      {isOpen && <div onClick={onClose} style={overlayStyle(navHeight)} />}

      <aside style={sidebarContainerStyle(isOpen, navHeight, bg, isDark)}>
        <div style={{ flex: 1, padding: "20px 16px", overflowY: "auto" }}>
  {/* Public links */}
  {PUBLIC_LINKS.map(link => (
    <NavLink
      key={link.to}
      to={link.to}
      style={linkStyle(isDark, colors)}
      onClick={onClose}
    >
      {link.label}
    </NavLink>
  ))}

  {/* Role-based links */}
  {isLoggedIn && (
    <>
      <div style={sectionHeaderStyle(colors)}>
        {userRole} Menu
      </div>

      {menuLinks.map(link => (
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


        <div style={{ padding: "16px" }}>
          <button onClick={onClose} style={closeButtonStyle(isDark, colors)}>
            ✕ Close Menu
          </button>
        </div>
      </aside>
    </>
  );
};

const linkStyle = (isDark, colors) => ({ isActive }) => ({
  display: "block",
  textDecoration: "none",
  color: colors.text,
  fontWeight: isActive ? 900 : 600,
  padding: "12px 18px",
  borderRadius: "10px",
  background: isActive
    ? isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"
    : "transparent",
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
  transition: "transform 0.3s ease",
  display: "flex",
  flexDirection: "column",
});

const sectionHeaderStyle = (colors) => ({
  margin: "10px 18px 12px",
  fontSize: "11px",
  fontWeight: 800,
  opacity: 0.4,
  textTransform: "uppercase",
  color: colors.text,
});

const overlayStyle = (navHeight) => ({
  position: "fixed",
  top: navHeight,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.2)",
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
