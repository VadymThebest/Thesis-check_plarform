// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const { colors } = useTheme();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: colors.pageBg,
        color: colors.text,
        padding: "40px 60px",
        boxSizing: "border-box",
      }}
    >
      {/* HERO SECTION */}
      <div
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "50px",
          flexWrap: "wrap",
        }}
      >
        {/* LEFT TEXT */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          <p
            style={{
              fontSize: "14px",
              letterSpacing: "2px",
              opacity: 0.8,
              marginBottom: "10px",
            }}
          >
            ACADEMIC INTEGRITY PLATFORM
          </p>

          <h1
            style={{
              fontSize: "42px",
              lineHeight: 1.3,
              marginBottom: "18px",
            }}
          >
            Check your thesis with{" "}
            <span style={{ color: "#f4b422" }}>academic confidence.</span>
          </h1>

          <p
            style={{
              maxWidth: "640px",
              lineHeight: "1.6",
              opacity: 0.85,
              marginBottom: "30px",
            }}
          >
            Thesis Check is a web platform designed for students, supervisors
            and institutions to analyse theses for plagiarism and AI-generated
            content and to produce clear, structured reports that support
            academic decision-making.
          </p>

          {/* BUTTONS */}
          <div style={{ display: "flex", gap: "16px" }}>
            <Link to="/upload">
              <button
                style={{
                  backgroundColor: "#f4b422",
                  padding: "12px 22px",
                  borderRadius: "12px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#1a1a1a",
                }}
              >
                Upload Thesis
              </button>
            </Link>

            <a href="#about">
              <button
                style={{
                  backgroundColor: "transparent",
                  padding: "12px 22px",
                  borderRadius: "12px",
                  border: `1px solid ${colors.text}`,
                  cursor: "pointer",
                  fontSize: "15px",
                  color: colors.text,
                }}
              >
                Learn More
              </button>
            </a>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div
          style={{
            flex: "0.8",
            minWidth: "300px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src="https://t3.ftcdn.net/jpg/04/66/94/24/360_F_466942464_u0Oo1eNuZrQG7M3Y2EWayJHfxqQudz0U.jpg"
            alt="Academic thesis review"
            style={{
              width: "100%",
              maxWidth: "430px",
              borderRadius: "14px",
              objectFit: "cover",
              boxShadow: "0 10px 35px rgba(0,0,0,0.35)",
            }}
          />
        </div>
      </div>

      {/* ABOUT + CONTACT SECTION */}
      <section
        id="about"
        style={{
          maxWidth: "1120px",
          margin: "80px auto 0",
          paddingTop: "40px",
          borderTop: `1px solid ${colors.text}30`,
        }}
      >
        {/* ABOUT */}
        <h2 style={{ fontSize: "28px", marginBottom: "16px" }}>About Us</h2>

        <p
          style={{
            maxWidth: "820px",
            lineHeight: 1.6,
            opacity: 0.85,
            marginBottom: "20px",
          }}
        >
          Thesis Check is an academic integrity platform built for students,
          supervisors, and institutions. Our purpose is to provide accurate,
          reliable, and transparent plagiarism and AI-content analysis systems
          that support academic excellence across universities.
        </p>

        <p
          style={{
            maxWidth: "820px",
            lineHeight: 1.6,
            opacity: 0.85,
            marginBottom: "60px",
          }}
        >
          By combining plagiarism detection, AI scoring, and structured
          reporting tools, Thesis Check enables better decision-making during
          thesis evaluation and revision stages.
        </p>

        {/* CONTACT */}
        <h2 style={{ fontSize: "28px", marginBottom: "14px" }}>Contact</h2>

        <p style={{ opacity: 0.85, marginBottom: "8px" }}>
          Need help or have questions? Our support team is available:
        </p>

        <p style={{ fontSize: "18px", fontWeight: 600 }}>
          support@thesischeck.com
        </p>

        <p style={{ opacity: 0.7, marginTop: "6px" }}>
          Monday – Friday · 09:00 → 18:00
        </p>
      </section>
    </div>
  );
};

export default Home;
