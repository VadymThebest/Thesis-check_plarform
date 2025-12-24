import React, { useMemo } from "react";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";

const Report = () => {
  const { colors } = useTheme();

  const report = useMemo(() => {
    try {
      const raw = localStorage.getItem("latestReport");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return "";
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
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "14px" }}>Report</h1>

        {!report ? (
          <div
            style={{
              backgroundColor: colors.cardBg,
              border: `1px solid ${colors.text}25`,
              borderRadius: "16px",
              padding: "24px",
            }}
          >
            <p style={{ opacity: 0.9, marginBottom: "14px" }}>
              There's no report yet. You need to upload a thesis first.
            </p>

            <Link to="/upload" style={{ textDecoration: "none" }}>
              <button
                style={{
                  backgroundColor: "#ffbf24",
                  color: "#1a1a1a",
                  padding: "10px 18px",
                  borderRadius: "12px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                Go to Upload
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div
              style={{
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.text}25`,
                borderRadius: "16px",
                padding: "22px",
                marginBottom: "18px",
              }}
            >
              <p style={{ opacity: 0.8, marginBottom: "6px" }}>File</p>
              <p style={{ fontSize: "18px", fontWeight: 700 }}>
                {report.fileName}
              </p>

              <p style={{ opacity: 0.7, marginTop: "10px" }}>
                Uploaded at: {formatDate(report.uploadedAt)}
              </p>

              <p style={{ opacity: 0.7, marginTop: "6px" }}>
                Status: <strong>{report.status}</strong>
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "16px",
              }}
            >
              <div
                style={{
                  backgroundColor: colors.cardBg,
                  border: `1px solid ${colors.text}25`,
                  borderRadius: "16px",
                  padding: "18px",
                }}
              >
                <p style={{ opacity: 0.8 }}>Plagiarism Score</p>
                <p style={{ fontSize: "34px", fontWeight: 800 }}>
                  {report.plagiarismScore}%
                </p>
                <p style={{ opacity: 0.7, fontSize: "13px" }}>
                  Demo value (backend gelince gerçek skor gelecek)
                </p>
              </div>

              <div
                style={{
                  backgroundColor: colors.cardBg,
                  border: `1px solid ${colors.text}25`,
                  borderRadius: "16px",
                  padding: "18px",
                }}
              >
                <p style={{ opacity: 0.8 }}>AI-Generated Score</p>
                <p style={{ fontSize: "34px", fontWeight: 800 }}>
                  {report.aiScore}%
                </p>
                <p style={{ opacity: 0.7, fontSize: "13px" }}>
                  Demo value (backend gelince gerçek skor gelecek)
                </p>
              </div>

              <div
                style={{
                  backgroundColor: colors.cardBg,
                  border: `1px solid ${colors.text}25`,
                  borderRadius: "16px",
                  padding: "18px",
                }}
              >
                <p style={{ opacity: 0.8 }}>Next Actions</p>
                <ul style={{ marginTop: "10px", opacity: 0.85 }}>
                  <li>Review similarity sections</li>
                  <li>Check citations & references</li>
                  <li>Re-run analysis after edits</li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Report;
