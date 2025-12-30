import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { getMyThesis } from "../api/thesis"; // Твой API бэкенда

const Dashboard = () => {
  const { colors, theme } = useTheme();
  const navigate = useNavigate();

  // Логика получения данных (из старого дизайна)
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
        <StudentDashboard 
          colors={colors} 
          theme={theme} 
          navigate={navigate} 
          checks={checks} 
          loading={loading} 
        />
      )}
    </div>
  );
};

function StudentDashboard({ colors, theme, navigate, checks, loading }) {
  const cardStyle = {
    backgroundColor: colors.cardBg,
    borderRadius: "14px",
    padding: "22px",
    color: colors.text,
    boxShadow: "0 6px 22px rgba(0,0,0,0.25)",
    border: `1px solid ${colors.text}12`,
  };

  // Расчет статистики на лету
  const stats = useMemo(() => {
    const total = checks.length;
    const avgPlag = total 
      ? Math.round(checks.reduce((s, c) => s + (c.plagiarism_score || 0), 0) / total) 
      : 0;
    const lastScore = checks[0]?.ai_score ?? "-";
    return { total, avgPlag, lastScore };
  }, [checks]);

  return (
    <div style={{ padding: "28px 18px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ margin: "0 0 14px", color: colors.text }}>Dashboard</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <div style={cardStyle}>
          <div style={{ opacity: 0.85, fontWeight: 800 }}>Total Checks</div>
          <div style={{ fontSize: 34, fontWeight: 900, marginTop: 8 }}>{stats.total}</div>
        </div>

        <div style={cardStyle}>
          <div style={{ opacity: 0.85, fontWeight: 800 }}>Average Plagiarism</div>
          <div style={{ fontSize: 34, fontWeight: 900, marginTop: 8 }}>{stats.avgPlag}%</div>
        </div>

        <div style={cardStyle}>
          <div style={{ opacity: 0.85, fontWeight: 800 }}>Last Report Score</div>
          <div style={{ fontSize: 34, fontWeight: 900, marginTop: 8 }}>{stats.lastScore}%</div>
        </div>
      </div>

      <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button onClick={() => navigate("/upload")} style={primaryBtn()}>+ New Upload</button>
        <button onClick={() => navigate("/my-reports")} style={ghostBtn(colors)}>My Reports</button>
        <button onClick={() => navigate("/checks-history")} style={ghostBtn(colors)}>History</button>
      </div>

      {/* Таблица из старой логики в новом дизайне */}
      <div style={{ ...cardStyle, marginTop: 25 }}>
        <h3 style={{ marginBottom: 15 }}>Recent Checks</h3>
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${colors.text}40`, textAlign: "left" }}>
                  <th style={{ padding: "10px" }}>Date</th>
                  <th style={{ padding: "10px" }}>Plagiarism</th>
                  <th style={{ padding: "10px" }}>AI Score</th>
                  <th style={{ padding: "10px" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {checks.slice(0, 5).map((item) => (
                  <tr key={item.id} style={{ borderBottom: `1px solid ${colors.text}15` }}>
                    <td style={{ padding: "12px 10px" }}>{new Date(item.uploaded_at).toLocaleDateString()}</td>
                    <td style={{ padding: "12px 10px" }}>{item.plagiarism_score}%</td>
                    <td style={{ padding: "12px 10px" }}>{item.ai_score}%</td>
                    <td style={{ padding: "12px 10px" }}>
                       <StatusPill status={item.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// Компонент для красивого статуса (как в твоем новом дизайне)
function StatusPill({ status }) {
    const map = {
      Pending: { bg: "rgba(59,130,246,0.18)", text: "#93c5fd" },
      Approved: { bg: "rgba(34,197,94,0.18)", text: "#86efac" },
      Rejected: { bg: "rgba(239,68,68,0.18)", text: "#fca5a5" },
    };
    const s = map[status] || map.Pending;
    return (
      <span style={{ 
        padding: "4px 10px", borderRadius: "20px", background: s.bg, color: s.text, fontSize: "12px", fontWeight: "bold" 
      }}>
        {status}
      </span>
    );
}

// Оставляю AdvisorDashboard без изменений, так как он требует отдельного API для списка всех студентов
function AdvisorDashboard({ colors, theme, navigate }) {
  // Тут пока остаются твои фейковые данные rows, так как нам нужен админский эндпоинт
  return <div style={{color: colors.text, padding: 20}}>Advisor Dashboard (Static Demo)</div>;
}

/* Helpers */
function primaryBtn() {
  return { padding: "10px 20px", borderRadius: "999px", background: "#FFC531", border: "none", fontWeight: "900", cursor: "pointer" };
}

function ghostBtn(colors) {
  return { padding: "10px 20px", borderRadius: "999px", background: "transparent", border: `1px solid ${colors.text}25`, color: colors.text, fontWeight: "900", cursor: "pointer" };
}

export default Dashboard;