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

  // ======= STATS =======
  const totalDocs = reports.length;
  const completedReports = reports.filter((r) => r.status === "completed").length;
  const totalUsers = new Set(reports.map((r) => r.student_email)).size;

  // ======= ACTIONS =======
  const handleApprove = async (id) => {
    try {
      await api.post(`/check/${id}/approve/`);
      setReports((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "approved" } : r))
      );
    } catch {
      alert("Failed to approve report");
    }
  };

  const handleReject = async (id) => {
    try {
      await api.post(`/check/${id}/reject/`);
      setReports((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "rejected" } : r))
      );
    } catch {
      alert("Failed to reject report");
    }
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
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
          Admin Dashboard
        </h1>

        {loading && <p>Loading data…</p>}
        {error && <p style={{ color: "#f97373" }}>{error}</p>}

        {!loading && !error && (
          <>
            {/* TOP STATS */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "20px",
                marginBottom: "40px",
              }}
            >
              <StatCard label="Total Users" value={totalUsers} color="#fbbf24" colors={colors} />
              <StatCard label="Total Documents" value={totalDocs} color="#4dd0e1" colors={colors} />
              <StatCard label="Reports Generated" value={completedReports} color="#ff4d4f" colors={colors} />
            </div>

            {/* RECENT REPORTS */}
            <div
              style={{
                backgroundColor: colors.cardBg,
                padding: "20px",
                borderRadius: "16px",
                border: `1px solid ${colors.text}25`,
              }}
            >
              <h2 style={{ fontSize: "22px", marginBottom: "20px" }}>
                Recent Reports
              </h2>

              {reports.length === 0 && <p style={{ opacity: 0.7 }}>No reports yet.</p>}

              {reports.slice(0, 10).map((r) => (
                <div
                  key={r.id}
                  style={{
                    padding: "12px 0",
                    borderBottom: `1px solid ${colors.text}20`,
                  }}
                >
                  <p style={{ fontWeight: 600 }}>Report #{r.id}</p>
                  <p style={{ fontSize: "14px", opacity: 0.8 }}>
                    Student: {r.student_email || "—"}
                  </p>
                  <p style={{ fontSize: "14px", opacity: 0.8 }}>
                    Status: <b>{r.status}</b>
                  </p>
                  <p style={{ fontSize: "14px", opacity: 0.8 }}>
                    Plagiarism: {r.plagiarism_score ?? "—"}% | AI:{" "}
                    {r.ai_score ?? "—"}% | Grammar: {r.grammar_issues ?? "—"}
                  </p>

                  {/* Approve / Reject buttons */}
                  <div style={{ marginTop: "8px", display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => handleApprove(r.id)}
                      style={{
                        background: "#34d399",
                        color: "#fff",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(r.id)}
                      style={{
                        background: "#f87171",
                        color: "#fff",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      Reject
                    </button>
                  </div>
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
    <p style={{ fontSize: "32px", fontWeight: 700, color }}>{value}</p>
  </div>
);

export default AdminDashboard;
