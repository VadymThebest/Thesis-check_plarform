// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { getMyThesis } from "../api/thesis";

const Dashboard = () => {
  const { theme } = useTheme();

  const colors = {
    pageBg: theme === "dark" ? "#020c1b" : "#f5f7fb",
    cardBg: theme === "dark" ? "#071426" : "#ffffff",
    text: theme === "dark" ? "#e6edf3" : "#0f172a",
  };

  const [checks, setChecks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChecks = async () => {
      try {
        const data = await getMyThesis();
        setChecks(data || []);
      } catch (err) {
        console.error("Failed to load thesis list", err);
      } finally {
        setLoading(false);
      }
    };

    loadChecks();
  }, []);

  const cardStyle = {
    backgroundColor: colors.cardBg,
    borderRadius: "14px",
    padding: "24px",
    color: colors.text,
    boxShadow: "0 6px 22px rgba(0,0,0,0.15)",
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
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div style={cardStyle}>
          <h3>Total Checks</h3>
          <p style={{ fontSize: "26px", marginTop: "10px" }}>
            {checks.length}
          </p>
        </div>

        <div style={cardStyle}>
          <h3>Average Plagiarism</h3>
          <p style={{ fontSize: "26px", marginTop: "10px" }}>
            {checks.length
              ? Math.round(
                  checks.reduce((s, c) => s + (c.plagiarism_score || 0), 0) /
                    checks.length
                )
              : 0}
            %
          </p>
        </div>

        <div style={cardStyle}>
          <h3>Last AI Score</h3>
          <p style={{ fontSize: "26px", marginTop: "10px" }}>
            {checks[0]?.ai_score ?? "-"}%
          </p>
        </div>
      </div>

      {/* Graph Section (пока остаётся заглушкой) */}
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
          <p>Graph placeholder</p>
        </div>
      </div>

      {/* Recent Checks */}
      <div style={{ marginTop: "40px", ...cardStyle }}>
        <h3 style={{ marginBottom: "20px" }}>Recent Checks</h3>

        {loading ? (
          <p style={{ opacity: 0.7 }}>Loading...</p>
        ) : checks.length === 0 ? (
          <p style={{ opacity: 0.7 }}>No checks yet</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${colors.text}40` }}>
                <th align="left">Date</th>
                <th align="left">Plagiarism</th>
                <th align="left">AI</th>
                <th align="left">File</th>
                <th align="left">Status</th>
              </tr>
            </thead>
            <tbody>
              {checks.slice(0, 5).map((item) => (
                <tr
                  key={item.id}
                  style={{ borderBottom: `1px solid ${colors.text}20` }}
                >
                  <td style={{ padding: "10px 0" }}>
                    {new Date(item.uploaded_at).toLocaleDateString()}
                  </td>
                  <td>{item.plagiarism_score}%</td>
                  <td>{item.ai_score}%</td>
                  <td style={{ opacity: 0.85 }}>
                    {item.file?.split("/").pop()}
                  </td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
