import React from "react";
import { useTheme } from "../context/ThemeContext";

const AdminDashboard = () => {
  const { colors } = useTheme();

  const stats = [
    { label: "Total Users", value: "312", color: "#fbbf24" },
    { label: "Total Documents", value: "1,284", color: "#4dd0e1" },
    { label: "Reports Generated", value: "932", color: "#ff4d4f" },
  ];

  const recent = [
    { user: "student@uni.edu", action: "Uploaded Thesis", date: "Today" },
    { user: "admin@uni.edu", action: "Generated Report", date: "Yesterday" },
    { user: "research@uni.edu", action: "Checked AI", date: "2 days ago" },
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
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
          Admin Dashboard
        </h1>

        {/* TOP STATS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          {stats.map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: colors.cardBg,
                padding: "20px",
                borderRadius: "16px",
                border: `1px solid ${colors.text}25`,
                boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
              }}
            >
              <h3 style={{ opacity: 0.8, marginBottom: "10px" }}>
                {item.label}
              </h3>
              <p
                style={{
                  fontSize: "32px",
                  fontWeight: 700,
                  color: item.color,
                }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* RECENT ACTIVITY */}
        <div
          style={{
            backgroundColor: colors.cardBg,
            padding: "20px",
            borderRadius: "16px",
            border: `1px solid ${colors.text}25`,
          }}
        >
          <h2 style={{ fontSize: "22px", marginBottom: "20px" }}>
            Recent Activity
          </h2>

          {recent.map((entry, index) => (
            <div
              key={index}
              style={{
                padding: "12px 0",
                borderBottom:
                  index !== recent.length - 1
                    ? `1px solid ${colors.text}20`
                    : "none",
              }}
            >
              <p style={{ marginBottom: "4px" }}>
                <strong>{entry.user}</strong>
              </p>
              <p style={{ opacity: 0.8 }}>{entry.action}</p>
              <p style={{ opacity: 0.6, fontSize: "14px" }}>{entry.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
