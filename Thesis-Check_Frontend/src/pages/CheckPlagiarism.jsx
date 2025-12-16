import React from "react";
import { useTheme } from "../context/ThemeContext";

const CheckPlagiarism = () => {
  const { colors } = useTheme();

  return (
    <div
      style={{
        backgroundColor: colors.pageBg,
        minHeight: "100vh",
        padding: "40px 20px",
        color: colors.text,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
          Plagiarism Check
        </h1>

        <p style={{ opacity: 0.8, marginBottom: "40px" }}>
          Upload or paste your thesis text to analyse similarity scores.
        </p>

        <textarea
          placeholder="Paste your thesis text here..."
          style={{
            width: "100%",
            minHeight: "200px",
            padding: "16px",
            borderRadius: "12px",
            border: `1px solid ${colors.text}40`,
            backgroundColor: colors.cardBg,
            color: colors.text,
            fontSize: "16px",
            resize: "vertical",
            marginBottom: "20px",
          }}
        />

        <button
          style={{
            backgroundColor: "#ffbf24",
            color: "#1a1a1a",
            padding: "12px 32px",
            fontSize: "16px",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Run Plagiarism Check
        </button>
      </div>
    </div>
  );
};

export default CheckPlagiarism;
