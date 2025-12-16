import React from "react";
import { useTheme } from "../context/ThemeContext";

const Workspace = () => {
  const { colors } = useTheme();

  const documents = [
    { name: "Thesis Draft v1", status: "Editing", updated: "2 days ago" },
    { name: "Thesis Draft v2", status: "Reviewed", updated: "5 days ago" },
    { name: "Literature Summary", status: "Completed", updated: "1 week ago" },
  ];

  return (
    <div
      style={{
        backgroundColor: colors.pageBg,
        minHeight: "100vh",
        padding: "40px 20px",
        color: colors.text,
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>Workspace</h1>

        <p style={{ opacity: 0.8, marginBottom: "30px" }}>
          Manage your thesis documents, drafts, and progress.
        </p>

        {/* DOCUMENT CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {documents.map((doc, i) => (
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
              <h3 style={{ marginBottom: "10px", fontSize: "18px" }}>
                {doc.name}
              </h3>

              <p style={{ marginBottom: "8px", opacity: 0.8 }}>
                Status: <strong>{doc.status}</strong>
              </p>

              <p style={{ opacity: 0.6 }}>Updated: {doc.updated}</p>

              <button
                style={{
                  marginTop: "16px",
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#ffbf24",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  color: "#1a1a1a",
                  fontWeight: 600,
                }}
              >
                Open
              </button>
            </div>
          ))}
        </div>

        {/* ADD NEW DOCUMENT BUTTON */}
        <button
          style={{
            marginTop: "30px",
            padding: "12px 28px",
            backgroundColor: "#ffbf24",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            color: "#1a1a1a",
            fontSize: "16px",
          }}
        >
          + Add New Document
        </button>
      </div>
    </div>
  );
};

export default Workspace;
