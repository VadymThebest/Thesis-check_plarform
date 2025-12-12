import React from "react";
import { useTheme } from "../context/ThemeContext";

const AdminStats = () => {
  const { colors } = useTheme();

  const stats = [
    { name: "Weekly Checks", value: 182, color: "#fbbf24" },
    { name: "AI Flags", value: 46, color: "#ff4d4f" },
    { name: "New Users", value: 27, color: "#4dd0e1" },
  ];

  const systemHealth = [
    { key: "API Status", value: "Operational" },
    { key: "Database", value: "Connected" },
    { key: "Storage Usage", value: "68%" },
    { key: "Server Uptime", value: "99.97%" },
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
        <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>Admin Statistics</h1>

        {/* TOP SUMMARY CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              style={{
                backgroundColor: colors.cardBg,
                borderRadius: "16px",
                padding: "20px",
                border: `1px solid ${colors.text}25`,
                boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
              }}
            >
              <h3 style={{ opacity: 0.8, marginBottom: "8px" }}>{stat.name}</h3>
              <p
                style={{
                  fontSize: "32px",
                  fontWeight: 700,
                  color: stat.color,
                  marginBottom: "10px",
                }}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* GRAPH PLACEHOLDER */}
        <div
          style={{
            backgroundColor: colors.cardBg,
            padding: "28px",
            borderRadius: "16px",
            border: `1px solid ${colors.text}25`,
            marginBottom: "40px",
          }}
        >
          <h2 style={{ fontSize: "22px", marginBottom: "16px" }}>System Trends</h2>

          <div
            style={{
              height: "240px",
              borderRadius: "12px",
              border: `1px dashed ${colors.text}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0.7,
            }}
          >
            <p>Graph placeholder (you can integrate real charts later)</p>
          </div>
        </div>

        {/* SYSTEM HEALTH */}
        <div
          style={{
            backgroundColor: colors.cardBg,
            padding: "28px",
            borderRadius: "16px",
            border: `1px solid ${colors.text}25`,
            marginBottom: "40px",
          }}
        >
          <h2 style={{ fontSize: "22px", marginBottom: "16px" }}>System Health</h2>

          {systemHealth.map((item, idx) => (
            <div
              key={idx}
              style={{
                borderBottom:
                  idx !== systemHealth.length - 1
                    ? `1px solid ${colors.text}20`
                    : "none",
                padding: "12px 0",
              }}
            >
              <p style={{ fontSize: "18px" }}>
                <strong>{item.key}:</strong> {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
