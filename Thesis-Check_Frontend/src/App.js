// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";

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
            {/* 🌐 Public */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* 👤 User (JWT protected) */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/upload"
              element={
                <PrivateRoute>
                  <UploadThesis />
                </PrivateRoute>
              }
            />

            <Route
              path="/report"
              element={
                <PrivateRoute>
                  <Report />
                </PrivateRoute>
              }
            />

            <Route
              path="/my-reports"
              element={
                <PrivateRoute>
                  <MyReports />
                </PrivateRoute>
              }
            />

            <Route
              path="/checks-history"
              element={
                <PrivateRoute>
                  <ChecksHistory />
                </PrivateRoute>
              }
            />

            <Route
              path="/check-plagiarism"
              element={
                <PrivateRoute>
                  <CheckPlagiarism />
                </PrivateRoute>
              }
            />

            <Route
              path="/check-ai"
              element={
                <PrivateRoute>
                  <CheckAI />
                </PrivateRoute>
              }
            />

            {/* 🛠 Admin (пока тоже PrivateRoute, позже можно по роли) */}
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/stats"
              element={
                <PrivateRoute>
                  <AdminStats />
                </PrivateRoute>
              }
            />

            {/* 🧠 Workspace */}
            <Route
              path="/workspace"
              element={
                <PrivateRoute>
                  <Workspace />
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
