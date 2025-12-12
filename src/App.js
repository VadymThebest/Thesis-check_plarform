// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/Layout";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import UploadThesis from "./pages/UploadThesis";
import CheckPlagiarism from "./pages/CheckPlagiarism";
import CheckAI from "./pages/CheckAI";
import Report from "./pages/Report";
import MyReports from "./pages/MyReports";
import ChecksHistory from "./pages/ChecksHistory";
import AdminDashboard from "./pages/AdminDashboard";
import AdminStats from "./pages/AdminStats";
import Workspace from "./pages/Workspace";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* User */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<UploadThesis />} />
            <Route path="/check-plagiarism" element={<CheckPlagiarism />} />
            <Route path="/check-ai" element={<CheckAI />} />
            <Route path="/report" element={<Report />} />
            <Route path="/my-reports" element={<MyReports />} />
            <Route path="/checks-history" element={<ChecksHistory />} />

            {/* Admin */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/stats" element={<AdminStats />} />

            {/* Workspace */}
            <Route path="/workspace" element={<Workspace />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
