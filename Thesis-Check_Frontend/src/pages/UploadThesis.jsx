// src/pages/UploadThesis.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import UploadDropzone from "../components/UploadDropzone";
import { useTheme } from "../context/ThemeContext";
import { uploadThesis } from "../api/thesis";

const UploadThesis = () => {
  const { colors } = useTheme();
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    setError("");

    if (!selectedFile) {
      setError("Please select a file first.");
      return;
    }

    try {
      setLoading(true);

      const res = await uploadThesis(selectedFile);
      // expected: { id, status, ... }
      if (!res?.id) {
        throw new Error("Upload succeeded, but no id returned.");
      }

      navigate(`/report?id=${res.id}`);
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Upload failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

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
        <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
          Upload Your Thesis
        </h1>

        <p style={{ opacity: 0.8, marginBottom: "40px" }}>
          Upload your thesis for plagiarism and AI analysis.
        </p>

        <div
          style={{
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.text}30`,
            padding: "40px 20px",
            borderRadius: "16px",
            marginBottom: "18px",
          }}
        >
          <UploadDropzone
            colors={colors}
            // ✅ Make dropzone tell us which file is selected
            onFileSelected={(file) => setSelectedFile(file)}
          />
        </div>

        {selectedFile && (
          <p style={{ opacity: 0.85, marginBottom: "10px" }}>
            Selected: <b>{selectedFile.name}</b>
          </p>
        )}

        {error && (
          <p style={{ color: "#f97373", fontSize: "13px", marginBottom: "10px" }}>
            {error}
          </p>
        )}

        <button
          onClick={handleUpload}
          disabled={loading}
          style={{
            backgroundColor: "#ffbf24",
            color: "#1a1a1a",
            padding: "12px 32px",
            fontSize: "16px",
            borderRadius: "12px",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: 600,
            opacity: loading ? 0.85 : 1,
          }}
        >
          {loading ? "Uploading..." : "Upload Thesis"}
        </button>
      </div>
    </div>
  );
};

export default UploadThesis;
