// src/pages/Dashboard.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Dashboard = () => {
  const { colors, theme } = useTheme();
  const navigate = useNavigate();

  const role = (localStorage.getItem("role") || "student").toLowerCase();
  const isAdvisor = role === "advisor";

  return (
    <div
      style={{
        background: theme === "light" ? "transparent" : "#020F2A",
        minHeight: "100vh",
      }}
    >
      {isAdvisor ? (
        <AdvisorDashboard colors={colors} theme={theme} navigate={navigate} />
      ) : (
        <StudentDashboard colors={colors} theme={theme} navigate={navigate} />
      )}
    </div>
  );
};

function StudentDashboard({ colors, theme, navigate }) {
  const cardStyle = {
    backgroundColor: colors.cardBg,
    borderRadius: "14px",
    padding: "22px",
    color: colors.text,
    boxShadow: "0 6px 22px rgba(0,0,0,0.25)",
    border: `1px solid ${colors.text}12`,
  };

  return (
    <div style={{ padding: "28px 18px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ margin: "0 0 14px", color: colors.text }}>Dashboard</h1>

      {/* NOT: className yoktu, media query çalışmıyordu. İstersen ekleyebilirsin ama yapıyı bozmadım. */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
        }}
      >
        <div style={cardStyle}>
          <div style={{ opacity: 0.85, fontWeight: 800 }}>Total Checks</div>
          <div style={{ fontSize: 34, fontWeight: 900, marginTop: 8 }}>128</div>
        </div>

        <div style={cardStyle}>
          <div style={{ opacity: 0.85, fontWeight: 800 }}>
            Average Plagiarism
          </div>
          <div style={{ fontSize: 34, fontWeight: 900, marginTop: 8 }}>15%</div>
        </div>

        <div style={cardStyle}>
          <div style={{ opacity: 0.85, fontWeight: 800 }}>Last Report Score</div>
          <div style={{ fontSize: 34, fontWeight: 900, marginTop: 8 }}>85%</div>
        </div>
      </div>

      <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button onClick={() => navigate("/upload")} style={primaryBtn()}>
          + New Upload
        </button>

        <button onClick={() => navigate("/my-reports")} style={ghostBtn(colors)}>
          My Reports
        </button>

        <button
          onClick={() => navigate("/checks-history")}
          style={ghostBtn(colors)}
        >
          Checks History
        </button>
      </div>

      <style>{`
        @media (max-width: 900px){
          .grid3 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function AdvisorDashboard({ colors, theme, navigate }) {
  const [rows, setRows] = useState([
    {
      id: "U-1001",
      student: "Aycan Bozkurt",
      email: "aycan.bozkurt@final.edu.tr",
      file: "Final_Thesis_v3.docx",
      date: "2025-12-20",
      status: "Pending",
      notes: "Final template, ready for submission.",
    },
    {
      id: "U-1002",
      student: "Cemre Toklu",
      email: "cemre.toklu@final.edu.tr",
      file: "Draft_Chapter2.pdf",
      date: "2025-12-19",
      status: "Pending",
      notes: "Needs formatting check.",
    },
    {
      id: "U-1003",
      student: "Mehmet Kaya",
      email: "mehmet.kaya@final.edu.tr",
      file: "Thesis_Final.pdf",
      date: "2025-12-18",
      status: "Approved",
      notes: "Similarity OK, AI risk low.",
    },
  ]);

  const counts = useMemo(() => {
    const c = { Pending: 0, Approved: 0, Rejected: 0, Sent: 0 };
    rows.forEach((r) => (c[r.status] = (c[r.status] || 0) + 1));
    return c;
  }, [rows]);

  const setStatus = (id, status) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const cardStyle = {
    backgroundColor: colors.cardBg,
    borderRadius: "14px",
    padding: "20px",
    color: colors.text,
    boxShadow: "0 6px 22px rgba(0,0,0,0.25)",
    border: `1px solid ${colors.text}12`,
  };

  return (
    <div style={{ padding: "26px 18px", maxWidth: "1200px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1 style={{ margin: 0, color: colors.text }}>Advisor Dashboard</h1>

          {/* BURASI eskiden hardcode #ffffff idi → light modda da beyaz kalıyordu */}
          <div
            style={{
              opacity: 0.8,
              marginTop: 6,
              color: colors.text,
            }}
          >
            Review student uploads, approve/reject, then send to institute.
          </div>
        </div>

        <button onClick={() => navigate("/checks-history")} style={ghostBtn(colors)}>
          View Checks History
        </button>
      </div>

      <div
        className="kpiGrid"
        style={{
          marginTop: 16,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 14,
        }}
      >
        <Kpi title="Pending" value={counts.Pending} colors={colors} />
        <Kpi title="Approved" value={counts.Approved} colors={colors} />
        <Kpi title="Rejected" value={counts.Rejected} colors={colors} />
        <Kpi title="Sent to Institute" value={counts.Sent} colors={colors} />
      </div>

      <div style={{ ...cardStyle, marginTop: 16 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <h2 style={{ margin: 0 }}>Review Queue</h2>
          <div style={{ opacity: 0.75, fontSize: 13 }}>
            Tip: “Send to Institute” only works after <b>Approved</b>.
          </div>
        </div>

        <div style={{ marginTop: 12, overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 860 }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: `1px solid ${colors.text}18` }}>
                <th style={th}>ID</th>
                <th style={th}>Student</th>
                <th style={th}>File</th>
                <th style={th}>Date</th>
                <th style={th}>Status</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r) => {
                const canSend = r.status === "Approved";
                return (
                  <tr key={r.id} style={{ borderBottom: `1px solid ${colors.text}12` }}>
                    <td style={tdMono}>{r.id}</td>
                    <td style={td}>
                      <div style={{ fontWeight: 900 }}>{r.student}</div>
                      <div style={{ opacity: 0.75, fontSize: 13 }}>{r.email}</div>
                      <div style={{ opacity: 0.75, fontSize: 13, marginTop: 4 }}>
                        <span style={{ fontWeight: 800 }}>Note:</span> {r.notes}
                      </div>
                    </td>
                    <td style={td}>
                      <div style={{ fontWeight: 800 }}>{r.file}</div>
                      <div style={{ opacity: 0.7, fontSize: 13 }}>
                        Template: FINAL (UI-ready)
                      </div>
                    </td>
                    <td style={td}>{r.date}</td>
                    <td style={td}>
                      <StatusPill status={r.status} />
                    </td>
                    <td style={td}>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <button
                          onClick={() => setStatus(r.id, "Approved")}
                          style={smallBtn("#22c55e")}
                          disabled={r.status === "Sent"}
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => setStatus(r.id, "Rejected")}
                          style={smallBtn("#ef4444")}
                          disabled={r.status === "Sent"}
                        >
                          Reject
                        </button>

                        <button
                          onClick={() => setStatus(r.id, "Sent")}
                          style={smallBtn("#fbbf24", "#1a1a1a")}
                          disabled={!canSend}
                          title={!canSend ? "Approve first" : "Send to institute"}
                        >
                          Send to Institute
                        </button>

                        <button
                          onClick={() => navigate("/report")}
                          style={smallGhost(colors)}
                          title="Open report screen (UI demo)"
                        >
                          Open Report
                        </button>
                      </div>

                      {!canSend && r.status !== "Sent" && (
                        <div style={{ marginTop: 8, fontSize: 12, opacity: 0.7 }}>
                          Send is disabled until you approve.
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px){
          .kpiGrid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 700px){
          .kpiGrid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function Kpi({ title, value, colors }) {
  return (
    <div
      style={{
        backgroundColor: colors.cardBg,
        borderRadius: "14px",
        padding: "18px",
        color: colors.text,
        boxShadow: "0 6px 22px rgba(0,0,0,0.25)",
        border: `1px solid ${colors.text}12`,
      }}
    >
      <div style={{ opacity: 0.8, fontWeight: 900 }}>{title}</div>
      <div style={{ fontSize: 34, fontWeight: 950, marginTop: 8 }}>{value}</div>
    </div>
  );
}

function StatusPill({ status }) {
  const map = {
    Pending: {
      bg: "rgba(59,130,246,0.18)",
      border: "rgba(59,130,246,0.45)",
      text: "#93c5fd",
    },
    Approved: {
      bg: "rgba(34,197,94,0.18)",
      border: "rgba(34,197,94,0.45)",
      text: "#86efac",
    },
    Rejected: {
      bg: "rgba(239,68,68,0.18)",
      border: "rgba(239,68,68,0.45)",
      text: "#fca5a5",
    },
    Sent: {
      bg: "rgba(251,191,36,0.18)",
      border: "rgba(251,191,36,0.45)",
      text: "#fde68a",
    },
  };

  const s = map[status] || map.Pending;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "6px 10px",
        borderRadius: 999,
        border: `1px solid ${s.border}`,
        background: s.bg,
        color: s.text,
        fontWeight: 900,
        fontSize: 12,
        letterSpacing: 0.3,
      }}
    >
      {status}
    </span>
  );
}

/* small helpers */
const th = { padding: "10px 10px", fontSize: 13, opacity: 0.85 };
const td = { padding: "14px 10px", verticalAlign: "top" };
const tdMono = {
  padding: "14px 10px",
  verticalAlign: "top",
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  opacity: 0.9,
};

function primaryBtn() {
  return {
    padding: "10px 16px",
    borderRadius: "999px",
    background: "#FFC531",
    border: "none",
    fontWeight: 900,
    cursor: "pointer",
  };
}

function ghostBtn(colors) {
  return {
    padding: "10px 14px",
    borderRadius: "999px",
    background: "transparent",
    border: `1px solid ${colors.text}25`,
    color: colors.text,
    fontWeight: 900,
    cursor: "pointer",
  };
}

function smallBtn(bg, color = "white") {
  return {
    padding: "8px 10px",
    borderRadius: "10px",
    background: bg,
    color,
    border: "none",
    fontWeight: 900,
    cursor: "pointer",
  };
}

function smallGhost(colors) {
  return {
    padding: "8px 10px",
    borderRadius: "10px",
    background: "transparent",
    border: `1px solid ${colors.text}25`,
    color: colors.text,
    fontWeight: 900,
    cursor: "pointer",
  };
}

export default Dashboard;
