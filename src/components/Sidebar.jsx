import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Sidebar = ({ isOpen, onClose, isLoggedIn, roleLinks }) => {
  const { theme, colors } = useTheme();

  const bg =
    theme === "dark" ? "rgba(2,20,52,0.98)" : "rgba(255,255,255,0.98)";

  const linkStyle = ({ isActive }) => ({
    display: "block",
    textDecoration: "none",
    color: colors.text,
    fontWeight: isActive ? 900 : 800,
    opacity: isActive ? 1 : 0.85,
    padding: "10px 12px",
    borderRadius: "12px",
    border: isActive ? `1px solid ${colors.text}25` : "1px solid transparent",
  });

  return (
    <>
      {/* Overlay (mobile) */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          zIndex: 998,
          display: isOpen ? "block" : "none",
        }}
      />

      {/* Sidebar */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "260px",
          zIndex: 999,
          background: bg,
          borderRight: `1px solid ${colors.text}18`,
          transform: isOpen ? "translateX(0)" : "translateX(-110%)",
          transition: "transform 220ms ease",
          padding: "14px",
          backdropFilter: "blur(10px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontWeight: 950, letterSpacing: 0.3 }}>THESIS CHECK</div>
          <button
            onClick={onClose}
            style={{
              marginLeft: "auto",
              border: `1px solid ${colors.text}25`,
              background: "transparent",
              color: colors.text,
              borderRadius: 10,
              padding: "6px 10px",
              cursor: "pointer",
              fontWeight: 900,
            }}
          >
            ✕
          </button>
        </div>

        <div
          style={{
            height: 1,
            background: `${colors.text}18`,
            margin: "12px 0",
          }}
        />

        {/* Public links */}
        <div style={{ display: "grid", gap: 6 }}>
          <NavLink to="/" style={linkStyle} onClick={onClose}>
            Home
          </NavLink>
          <NavLink to="/about" style={linkStyle} onClick={onClose}>
            About
          </NavLink>
          <NavLink to="/contact" style={linkStyle} onClick={onClose}>
            Contact
          </NavLink>
        </div>

        {isLoggedIn && (
          <>
            {/* Divider between public links and logged-in links (replaces MENU label) */}
            <div
              style={{
                height: 1,
                background: `${colors.text}12`,
                margin: "12px 0",
              }}
            />

            <div style={{ display: "grid", gap: 6 }}>
              {roleLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  style={linkStyle}
                  onClick={onClose}
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
