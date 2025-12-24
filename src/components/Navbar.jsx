import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import LogoMark from "./LogoMark";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // AUTH
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("accessToken");

  const isLoggedIn = !!token;

  const userEmail =
    localStorage.getItem("userEmail") ||
    localStorage.getItem("email") ||
    localStorage.getItem("username") ||
    "";

  const role = (localStorage.getItem("role") || "student").toLowerCase();
  const isAdvisor = role === "advisor";
  const isAdmin = role === "admin";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const isDark = theme === "dark";

  // Navbar theme
  const navBg = isDark ? "rgba(2,20,52,0.96)" : "#FFC531";
  const textColor = isDark ? "#ffffff" : "#021434";
  const borderColor = isDark
    ? "rgba(255,255,255,0.15)"
    : "rgba(2,20,52,0.25)";

  // ROLE LINKS (sidebar için)
  let roleLinks = [];
  if (isAdmin) {
    roleLinks = [
      { to: "/admin/dashboard", label: "Admin Dashboard" },
      { to: "/admin/stats", label: "Admin Stats" },
    ];
  } else if (isAdvisor) {
    roleLinks = [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/checks-history", label: "Checks History" },
      { to: "/workspace", label: "Workspace" },
      { to: "/report", label: "Report" },
    ];
  } else {
    roleLinks = [
      { to: "/upload", label: "Upload Thesis" },
      { to: "/dashboard", label: "Dashboard" },
      { to: "/my-reports", label: "My Reports" },
      { to: "/checks-history", label: "Checks History" },
      { to: "/workspace", label: "Workspace" },
      { to: "/report", label: "Report" },
    ];
  }

  const linkStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: textColor,
    fontWeight: 900,
    padding: "8px 14px",
    borderRadius: "999px",
   border: isActive ? `1px solid ${borderColor}` : "1px solid transparent",
    background: isActive
      ? isDark
        ? "rgba(255,255,255,0.08)"
        : "rgba(2,20,52,0.10)"
      : "transparent",
    whiteSpace: "nowrap",
  });


  const Brand = () => (
    <div
    className="brandWrap"
      onClick={() => navigate("/")}
      style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
      title="Go Home"
    >
      <LogoMark size={44} />
    </div>
  );

  return (
    <>
      {/* SIDEBAR – SADECE GİRİŞTE */}
      {isLoggedIn && (
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isLoggedIn={isLoggedIn}
          roleLinks={roleLinks}
        />
      )}

      <header
      className="tc-navbar"
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
        className="navGrid"
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
          {/* LEFT */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {isLoggedIn ? (
              <button
              className="hamburgerBtn"
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
  aria-label="Open menu"
  title="Menu"
>
  ☰
</button>

            ) : (
              <Brand />
            )}
          </div>

          {/* CENTER */}
          <div 
        className="navLinks"
          
          style={{ display: "flex", justifyContent: "center", gap: 12 }}>
           
            {!isLoggedIn ? (
              <>
                <NavLink to="/" style={linkStyle}>
                  Home
                </NavLink>
                <NavLink to="/about" style={linkStyle}>
                  About
                </NavLink>
                <NavLink to="/contact" style={linkStyle}>
                  Contact
                </NavLink>
              </>
            ) : (
             
              <Brand />
            )}
          </div>

          {/* RIGHT */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              justifyContent: "flex-end",
            }}
          >
            {isLoggedIn && (
              <span
                style={{
                  fontSize: 13,
                  color: textColor,
                  opacity: 0.9,
                  maxWidth: 200,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
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
                background: isDark
                  ? "transparent"
                  : "rgba(255,255,255,0.35)",
                color: textColor,
                cursor: "pointer",
                fontWeight: 900,
              }}
            >
              {isDark ? "🌙 Dark" : "☀️ Light"}
            </button>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                style={{
                  padding: "9px 16px",
                  borderRadius: "999px",
                  background: isDark ? "#FFC531" : "#021434",
                  color: isDark ? "#021434" : "#ffffff",
                  border: "none",
                  fontWeight: 950,
                  cursor: "pointer",
                }}
              >
                LOG OUT
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                style={{
                  padding: "9px 16px",
                  borderRadius: "999px",
                  background: isDark ? "#021434" : "#021434",
                  color: "#ffffff",
                  border: "none",
                  fontWeight: 950,
                  cursor: "pointer",
                }}
              >
                LOG IN
              </button>
            )}
          </div>
        </div>
              <style>{`
  /* Giriş YAPINCA hamburger her ekranda görünsün */
  .hamburgerBtn { display: inline-flex; }

  /* Giriş YOKKEN (public) menü mobilde daralınca linkleri saklayabilirsin */
  @media (max-width: 700px) {
    .navLinks { display: none !important; }
  }
`}</style>


      </header>
    </>
  );
};

export default Navbar;