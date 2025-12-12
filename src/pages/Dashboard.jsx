// src/pages/Dashboard.jsx
import React from "react";
import { useTheme } from "../context/ThemeContext";

const Dashboard = () => {
  const { colors } = useTheme();

  const cardStyle = {
    backgroundColor: colors.cardBg,
    borderRadius: "14px",
    padding: "24px",
    color: colors.text,
    boxShadow: "0 6px 22px rgba(0,0,0,0.25)",
    flex: 1,
  };

  return (
    <div
      style={{
        backgroundColor: colors.pageBg,
        minHeight: "100vh",
        padding: "40px 60px",
        color: colors.text,
      }}
    >
      <h1 style={{ fontSize: "32px", textAlign: "center", marginBottom: "40px" }}>
        Dashboard
      </h1>

      {/* Top Stats */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div style={cardStyle}>
          <h3>Total Checks</h3>
          <p style={{ fontSize: "26px", marginTop: "10px" }}>128</p>
        </div>

        <div style={cardStyle}>
          <h3>Average Plagiarism</h3>
          <p style={{ fontSize: "26px", marginTop: "10px" }}>15%</p>
        </div>

        <div style={cardStyle}>
          <h3>Last Report Score</h3>
          <p style={{ fontSize: "26px", marginTop: "10px" }}>85%</p>
        </div>
      </div>

      {/* Graph Section */}
      <div
        style={{
          ...cardStyle,
          height: "260px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3>Checks in the Last 7 Days</h3>

        <div
          style={{
            flex: 1,
            marginTop: "20px",
            borderRadius: "10px",
            border: `1px dashed ${colors.text}40`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: 0.7,
          }}
        >
          <p>Graph placeholder (you can replace with real chart later)</p>
        </div>
      </div>

      {/* Recent Checks Table */}
      <div style={{ marginTop: "40px", ...cardStyle }}>
        <h3 style={{ marginBottom: "20px" }}>Recent Checks</h3>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            color: colors.text,
          }}
        >
          <thead>
            <tr style={{ borderBottom: `1px solid ${colors.text}40` }}>
              <th style={{ textAlign: "left", padding: "10px 0" }}>Date</th>
              <th style={{ textAlign: "left", padding: "10px 0" }}>Score</th>
              <th style={{ textAlign: "left", padding: "10px 0" }}>File Name</th>
              <th style={{ textAlign: "left", padding: "10px 0" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Apr 25, 2024", "84%", "Thesis_Draft.pdf", "Completed"],
              ["Apr 24, 2024", "17%", "Chapter2_docx", "Completed"],
              ["Apr 22, 2024", "23%", "review.pdf", "Completed"],
            ].map((row, i) => (
              <tr
                key={i}
                style={{
                  borderBottom: `1px solid ${colors.text}20`,
                }}
              >
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: "10px 0", opacity: 0.9 }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
