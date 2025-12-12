import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div style={{ minHeight: "100vh", background: "#021631", color: "#fff" }}>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
