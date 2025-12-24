import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const About = () => {
  const { colors, theme } = useTheme();
  const navigate = useNavigate();

  const features = [
    {
      title: "Plagiarism Detection",
      desc: "Check similarity across academic sources and detect copied content.",
      path: "/check-plagiarism",
    },
    {
      title: "AI-Generated Content Detection",
      desc: "Identify AI-written text and potential academic integrity risks.",
      path: "/check-ai",
    },
    {
      title: "Upload & Analyze Thesis",
      desc: "Upload PDF or DOCX files and start analysis instantly.",
      path: "/upload",
    },
    {
      title: "Reports & Dashboard",
      desc: "Track reports, history, and results in your dashboard.",
      path: "/dashboard",
    },
  ];

  const pageTextColor = theme === "light" ? "#1a1a1a" : "#ffffff";

  return (
    <div
      style={{
        background: theme === "light" ? "transparent" : "#021434",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          color: pageTextColor,
        }}
      >
        <h1 style={{ fontSize: "38px", marginBottom: "16px" }}>
          About Thesis Check
        </h1>

        <p
          style={{
            fontSize: "17px",
            lineHeight: 1.7,
            opacity: 1,
            maxWidth: "70ch",
          }}
        >
          Thesis Check is an academic integrity platform designed for students
          and institutions. It helps detect plagiarism, identify AI-generated
          content, and manage thesis evaluation workflows in a clear and
          structured way.
        </p>

        <h2 style={{ marginTop: "42px", marginBottom: "16px" }}>
          What Thesis Check offers
        </h2>

        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "18px",
            marginTop: "20px",
          }}
        >
          {features.map((item) => (
            <div
              key={item.title}
              style={{
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.text}18`,
                borderRadius: "16px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                textAlign: "left",
              }}
            >
              <div>
                <h3 style={{ marginTop: 0 }}>{item.title}</h3>
                <p style={{ opacity: 0.8, lineHeight: 1.6 }}>{item.desc}</p>
              </div>

              <button
                onClick={() => navigate(item.path)}
                style={{
                  marginTop: "16px",
                  alignSelf: "flex-start",
                  backgroundColor: "transparent",
                  color: colors.text,
                  border: `1px solid ${colors.text}35`,
                  padding: "8px 14px",
                  borderRadius: "999px",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                Learn more →
              </button>
            </div>
          ))}
        </div>

        <div
          style={{
            width: "100%",
            marginTop: "50px",
            padding: "20px",
            borderRadius: "14px",
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.text}18`,
            opacity: 1,
            textAlign: "left",
          }}
        >
          <p style={{ margin: 0 }}>
            Thesis Check is built to support academic integrity while keeping the
            user experience simple, clear, and accessible across devices.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
