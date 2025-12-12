import React from "react";
import { useTheme } from "../context/ThemeContext";

const Report = () => {
  const { colors } = useTheme();

  // Dummy report data (backend bağlanınca API'den gelecek)
  const report = {
    title: "Thesis Draft - April Report",
    date: "April 25, 2024",
    plagiarismScore: "15%",
    aiScore: "8%",
    summary:
      "This report analyses the originality and AI-generated likelihood of the submitted thesis. Highlighted sections require review by the supervisor.",
  };

  return (
    <div
      style={{
        backgroundColor: colors.pageBg,
        color: colors.text,
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: colors.cardBg,
          padding: "30px",
          borderRadius: "16px",
          border: `1px solid ${colors.text}25`,
          boxShadow: "0 8px 28px rgba(0,0,0,0.25)",
        }}
      >
        <h1 style={{ fontSize: "30px", marginBottom: "10px" }}>{report.title}</h1>

        <p style={{ opacity: 0.7, marginBottom: "20px" }}>{report.date}</p>

        {/* SCORES */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <ScoreCard
            label="Plagiarism Score"
            value={report.plagiarismScore}
            color="#ff4d4f"
            colors={colors}
          />
          <ScoreCard
            label="AI Score"
            value={report.aiScore}
            color="#fbbf24"
            colors={colors}
          />
        </div>

        {/* SUMMARY SECTION */}
        <div
          style={{
            backgroundColor: colors.pageBg,
            borderRadius: "12px",
            padding: "20px",
            border: `1px solid ${colors.text}20`,
            marginBottom: "30px",
          }}
        >
          <h3 style={{ marginBottom: "10px", fontSize: "20px" }}>
            Report Summary
          </h3>
          <p style={{ opacity: 0.85, lineHeight: 1.6 }}>{report.summary}</p>
        </div>

        {/* DOWNLOAD BUTTON */}
        <button
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "#fbbf24",
            border: "none",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: 600,
            cursor: "pointer",
            color: "#000",
          }}
        >
          Download PDF Report
        </button>
      </div>
    </div>
  );
};

const ScoreCard = ({ label, value, color, colors }) => (
  <div
    style={{
      backgroundColor: colors.pageBg,
      padding: "16px",
      borderRadius: "12px",
      flex: 1,
      minWidth: "200px",
      border: `1px solid ${colors.text}20`,
    }}
  >
    <h4 style={{ marginBottom: "8px", fontSize: "16px" }}>{label}</h4>
    <p style={{ fontSize: "28px", fontWeight: 700, color }}>{value}</p>
  </div>
);

export default Report;
