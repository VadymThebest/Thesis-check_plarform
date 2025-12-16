// src/pages/Report.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { getResult } from "../api/thesis";

const Report = () => {
  const { colors } = useTheme();
  const [params] = useSearchParams();
  const id = params.get("id");

  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const title = useMemo(() => {
    if (!id) return "Report";
    return `Report #${id}`;
  }, [id]);

  useEffect(() => {
    if (!id) {
      setError("No report id provided. Open this page with ?id=<submissionId>");
      return;
    }

    let interval = null;
    let isMounted = true;

    const load = async () => {
      try {
        setError("");
        const res = await getResult(id);
        if (!isMounted) return;
        setData(res);

        if (res?.status === "completed") {
          if (interval) clearInterval(interval);
        }
      } catch (err) {
        const msg =
          err?.response?.data?.detail ||
          err?.response?.data?.message ||
          "Failed to load report.";
        if (!isMounted) return;
        setError(msg);
        if (interval) clearInterval(interval);
      }
    };

    // initial load
    load();

    // poll every 3s until completed
    interval = setInterval(load, 3000);

    return () => {
      isMounted = false;
      if (interval) clearInterval(interval);
    };
  }, [id]);

  const prettyDate = useMemo(() => {
    return new Date().toLocaleString();
  }, []);

  const plagiarismScore =
    data?.plagiarism_score !== undefined ? `${data.plagiarism_score}%` : "—";
  const aiScore = data?.ai_score !== undefined ? `${data.ai_score}%` : "—";
  const grammarIssues =
    data?.grammar_issues !== undefined ? `${data.grammar_issues}` : "—";
  const citationsMissing =
    data?.citations_missing !== undefined
      ? data.citations_missing
        ? "Yes"
        : "No"
      : "—";

  const status = data?.status || "loading";

  const summaryText =
    status === "processing"
      ? "Your thesis is being processed. This page will update automatically."
      : "This report analyses the originality and AI-generated likelihood of the submitted thesis.";

  return (
    <div
      style={{
        backgroundColor: colors.pageBg,
        color: colors.text,
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: colors.cardBg,
          padding: "30px",
          borderRadius: "16px",
          border: `1px solid ${colors.text}25`,
          boxShadow: "0 8px 28px rgba(0,0,0,0.25)",
        }}
      >
        <h1 style={{ fontSize: "30px", marginBottom: "10px" }}>{title}</h1>

        <p style={{ opacity: 0.7, marginBottom: "10px" }}>
          {prettyDate} • Status: <b>{status}</b>
        </p>

        {error && (
          <p style={{ color: "#f97373", marginBottom: "12px" }}>{error}</p>
        )}

        {/* SCORES */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <ScoreCard
            label="Plagiarism Score"
            value={plagiarismScore}
            color="#ff4d4f"
            colors={colors}
          />
          <ScoreCard
            label="AI Score"
            value={aiScore}
            color="#fbbf24"
            colors={colors}
          />
          <ScoreCard
            label="Grammar Issues"
            value={grammarIssues}
            color="#60a5fa"
            colors={colors}
          />
          <ScoreCard
            label="Citations Missing"
            value={citationsMissing}
            color="#a78bfa"
            colors={colors}
          />
        </div>

        {/* SUMMARY SECTION */}
        <div
          style={{
            backgroundColor: colors.pageBg,
            borderRadius: "12px",
            padding: "20px",
            border: `1px solid ${colors.text}20`,
            marginBottom: "30px",
          }}
        >
          <h3 style={{ marginBottom: "10px", fontSize: "20px" }}>
            Report Summary
          </h3>
          <p style={{ opacity: 0.85, lineHeight: 1.6 }}>{summaryText}</p>
        </div>

        {/* DOWNLOAD BUTTON (placeholder) */}
        <button
          disabled
          title="Generate PDF on backend if needed"
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "#fbbf24",
            border: "none",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: 600,
            cursor: "not-allowed",
            color: "#000",
            opacity: 0.7,
          }}
        >
          Download PDF Report (soon)
        </button>
      </div>
    </div>
  );
};

const ScoreCard = ({ label, value, color, colors }) => (
  <div
    style={{
      backgroundColor: colors.pageBg,
      padding: "16px",
      borderRadius: "12px",
      flex: 1,
      minWidth: "200px",
      border: `1px solid ${colors.text}20`,
    }}
  >
    <h4 style={{ marginBottom: "8px", fontSize: "16px" }}>{label}</h4>
    <p style={{ fontSize: "28px", fontWeight: 700, color }}>{value}</p>
  </div>
);

export default Report;
