import React from "react";
import { useTheme } from "../context/ThemeContext";

const MyReports = () => {
  const { colors } = useTheme();

  const reports = [
    {
      title: "Thesis Draft - April",
      date: "April 25, 2024",
      plagiarism: "15%",
      ai: "8%",
    },
    {
      title: "Thesis Draft - March",
      date: "March 19, 2024",
      plagiarism: "23%",
      ai: "12%",
    },
    {
      title: "Research Summary",
      date: "February 10, 2024",
      plagiarism: "11%",
      ai: "4%",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: colors.pageBg,
        color: colors.text,
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>My Reports</h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {reports.map((report, index) => (
            <div
              key={index}
              style={{
                backgroundColor: colors.cardBg,
                borderRadius: "16px",
                padding: "20px",
                border: `1px solid ${colors.text}25`,
                boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
              }}
            >
              <h3 style={{ marginBottom: "8px" }}>{report.title}</h3>

              <p style={{ opacity: 0.7, marginBottom: "10px" }}>
                {report.date}
              </p>

              <div style={{ marginBottom: "10px" }}>
                <strong>Plagiarism:</strong> {report.plagiarism}
              </div>

              <div style={{ marginBottom: "16px" }}>
                <strong>AI Score:</strong> {report.ai}
              </div>

              <button
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#ffbf24",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  color: "#1a1a1a",
                  fontWeight: 600,
                }}
              >
                View Report
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyReports;
