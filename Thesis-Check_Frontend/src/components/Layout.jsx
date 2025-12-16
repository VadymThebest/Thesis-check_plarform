// src/components/Layout.jsx
import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#021631",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      {/* ⬇️ ВАЖНО: main должен растягиваться */}
      <main style={{ flex: 1 }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;

