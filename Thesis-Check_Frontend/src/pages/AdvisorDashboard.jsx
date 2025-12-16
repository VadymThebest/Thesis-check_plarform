import React, { useEffect, useState } from "react";
import api from "../api/client";

const AdvisorDashboard = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    api.get("/check/").then(res => setReports(res.data));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Advisor Dashboard</h1>

      {reports.map(r => (
        <div key={r.id} style={{ marginBottom: 16 }}>
          <b>{r.student_email}</b> — {r.file}
          <div>
            Plagiarism: {r.plagiarism_score}% | AI: {r.ai_score}%
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdvisorDashboard;
