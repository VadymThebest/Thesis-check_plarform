// src/components/Layout.jsx
import React from "react";
import Navbar from "./Navbar";
import { useTheme } from "../context/ThemeContext";

const Layout = ({ children }) => {

  const { theme } = useTheme();
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
        backgroundColor: theme === "light" ? "#fff8dc" : "#021434"
      }}
    >
      <Navbar />
      <main
         style={{
          width: "100%",
          maxWidth: "100vw",
          overflowX: "hidden",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;

