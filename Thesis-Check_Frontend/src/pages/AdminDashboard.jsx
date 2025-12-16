// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../api/client";
import { useTheme } from "../context/ThemeContext";

const AdminDashboard = () => {
  const { colors } = useTheme();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await api.get("/check/");
        setReports(res.data || []);
      } catch (err) {
        setError("Failed to load reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // ======= STATS CALCULATION =======
  const totalDocs = reports.length;

  const avg = (field) => {
    const valid = reports.filter((r) => r[field] !== null && r[field] !== undefined);
    if (valid.length === 0) return 0;
    return (
      valid.reduce((sum, r) => sum + Number(r[field]), 0) / valid.length
    ).toFixed(1);
  };

  const avgPlagiarism = avg("plagiarism_score");
  const avgAI = avg("ai_score");
  const avgGrammar = avg("grammar_issues");

  // ======= RENDER =======
  return (
    <div
      style={{
        backgroundColor: colors.pageBg,
        minHeight: "100vh",
        padding: "40px 20px",
        color: colors.text,
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "30px" }}>
          Admin Dashboard
        </h1>

        {loading && <p>Loading data…</p>}
        {error && <p style={{ color: "#f97373" }}>{error}</p>}

        {!loading && !error && (
          <>
            {/* ===== TOP STATS ===== */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "20px",
                marginBottom: "40px",
              }}
            >
              <StatCard
                label="Total Documents"
                value={totalDocs}
                color="#fbbf24"
                colors={colors}
              />
              <StatCard
                label="Avg Plagiarism (%)"
                value={avgPlagiarism}
                color="#ff4d4f"
                colors={colors}
              />
              <StatCard
                label="Avg AI Score (%)"
                value={avgAI}
                color="#38bdf8"
                colors={colors}
              />
              <StatCard
                label="Avg Grammar Issues"
                value={avgGrammar}
                color="#34d399"
                colors={colors}
              />
            </div>

            {/* ===== RECENT REPORTS ===== */}
            <div
              style={{
                backgroundColor: colors.cardBg,
                padding: "24px",
                borderRadius: "16px",
                border: `1px solid ${colors.text}25`,
              }}
            >
              <h2 style={{ fontSize: "22px", marginBottom: "20px" }}>
                Recent Submissions
              </h2>

              {reports.length === 0 && (
                <p style={{ opacity: 0.7 }}>No reports yet.</p>
              )}

              {reports.slice(0, 10).map((r) => (
                <div
                  key={r.id}
                  style={{
                    padding: "14px 0",
                    borderBottom: `1px solid ${colors.text}20`,
                  }}
                >
                  <p style={{ fontWeight: 600 }}>
                    Report #{r.id}
                  </p>
                  <p style={{ fontSize: "14px", opacity: 0.8 }}>
                    Student: {r.student_email || "—"}
                  </p>
                  <p style={{ fontSize: "14px", opacity: 0.8 }}>
                    Status: <b>{r.status}</b>
                  </p>
                  <p style={{ fontSize: "14px", opacity: 0.8 }}>
                    Plagiarism: {r.plagiarism_score ?? "—"}% | AI:{" "}
                    {r.ai_score ?? "—"}% | Grammar:{" "}
                    {r.grammar_issues ?? "—"}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color, colors }) => (
  <div
    style={{
      backgroundColor: colors.cardBg,
      padding: "20px",
      borderRadius: "16px",
      border: `1px solid ${colors.text}25`,
      boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
    }}
  >
    <h3 style={{ opacity: 0.8, marginBottom: "10px" }}>{label}</h3>
    <p style={{ fontSize: "32px", fontWeight: 700, color }}>
      {value}
    </p>
  </div>
);

export default AdminDashboard;
