import React from "react";
import UploadDropzone from "../components/UploadDropzone";
import { useTheme } from "../context/ThemeContext";

const UploadThesis = () => {
  const { colors } = useTheme();

  return (
    <div
      style={{
        backgroundColor: colors.pageBg,
        minHeight: "100vh",
        padding: "40px 20px",
        boxSizing: "border-box",
        color: colors.text,
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>Upload Your Thesis</h1>
        <p style={{ opacity: 0.8, marginBottom: "40px" }}>
          Upload your thesis for plagiarism and AI analysis.
        </p>

        <div
          style={{
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.text}30`,
            padding: "40px 20px",
            borderRadius: "16px",
            marginBottom: "40px",
          }}
        >
          <UploadDropzone colors={colors} />
        </div>

        {/* Upload Button */}
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
          Upload Thesis
        </button>
      </div>
    </div>
  );
};

export default UploadThesis;
