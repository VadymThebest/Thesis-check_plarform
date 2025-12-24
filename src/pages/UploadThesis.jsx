import React, { useMemo, useState } from "react";
import UploadDropzone from "../components/UploadDropzone";
import { useTheme } from "../context/ThemeContext";

const formatBytes = (bytes = 0) => {
  if (!bytes) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);
  return `${value.toFixed(value >= 10 || i === 0 ? 0 : 1)} ${sizes[i]}`;
};

const UploadThesis = () => {
  const { colors } = useTheme();

  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const fileMeta = useMemo(() => {
    if (!selectedFile) return null;

    const name = selectedFile.name || "";
    const ext = name.includes(".") ? name.split(".").pop().toLowerCase() : "";
    const typeLabel = ext === "pdf" ? "PDF" : ext === "docx" ? "DOCX" : "Unknown";

    return {
      name,
      ext,
      typeLabel,
      size: formatBytes(selectedFile.size),
      lastModified: selectedFile.lastModified
        ? new Date(selectedFile.lastModified).toLocaleString()
        : "-",
    };
  }, [selectedFile]);

  const onFileSelected = (file) => {
    setError("");

    const name = file?.name || "";
    const ext = name.includes(".") ? name.split(".").pop().toLowerCase() : "";
    const allowed = ["pdf", "docx"];

    if (!allowed.includes(ext)) {
      setSelectedFile(null);
      setError("Please upload only PDF or DOCX files.");
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setError("Please select a file first.");
      return;
    }

    // No backend yet: UI demo only
    alert(
      `Ready to upload!\n\nFile: ${selectedFile.name}\nDescription: ${
        description.trim() || "(none)"
      }\n\n(Once backend is connected, the real upload will start here.)`
    );
  };

  const descMax = 280;

  return (
    <div
      style={{
        backgroundColor: colors.pageBg,
        minHeight: "100vh",
        padding: "44px 16px",
        boxSizing: "border-box",
        color: colors.text,
      }}
    >
      <div style={{ maxWidth: "980px", width: "100%", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "22px" }}>
          <h1 style={{ fontSize: "34px", margin: 0 }}>Upload Thesis</h1>
          <p style={{ opacity: 0.8, marginTop: "10px", lineHeight: 1.6 }}>
            Upload your thesis to generate plagiarism & AI-detection insights.
            Make sure you submit the <b>final template</b>.
          </p>
        </div>

        {/* Dropzone Card */}
        <div
          style={{
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.text}18`,
            borderRadius: "18px",
            padding: "22px",
            boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
          }}
        >
          <UploadDropzone
            label={
              selectedFile
                ? `Selected: ${selectedFile.name}`
                : "Drag & drop your thesis file here"
            }
            onFileSelected={onFileSelected}
          />

          {/* Error */}
          {error && (
            <div
              style={{
                marginTop: "14px",
                padding: "10px 12px",
                borderRadius: "12px",
                backgroundColor: "rgba(255, 107, 107, 0.12)",
                border: "1px solid rgba(255, 107, 107, 0.35)",
                color: "#ffb3b3",
                fontWeight: 800,
              }}
            >
              {error}
            </div>
          )}

          {/* Final template note */}
          <div
            style={{
              marginTop: "16px",
              padding: "12px 14px",
              borderRadius: "14px",
              border: `1px solid ${colors.text}18`,
              backgroundColor: colors.pageBg,
              lineHeight: 1.5,
            }}
          >
            <div style={{ fontWeight: 900 }}>Final Template Required</div>
            <div style={{ opacity: 0.82, marginTop: "6px", fontSize: "14px" }}>
              Accepted formats: <b>.pdf</b> and <b>.docx</b>. Please upload the
              FINAL formatted version you will submit to the institute.
            </div>
          </div>
        </div>

        {/* Details + Description */}
        <div
          style={{
            marginTop: "18px",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "18px",
          }}
        >
          {/* File Info */}
          <div
            style={{
              backgroundColor: colors.cardBg,
              border: `1px solid ${colors.text}18`,
              borderRadius: "18px",
              padding: "18px",
            }}
          >
            <h3 style={{ margin: 0, marginBottom: "12px" }}>File Details</h3>

            {!fileMeta ? (
              <p style={{ opacity: 0.8, margin: 0 }}>
                No file selected yet.
              </p>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "10px",
                }}
              >
                <InfoPill colors={colors} label="File name" value={fileMeta.name} />
                <InfoPill colors={colors} label="Type" value={fileMeta.typeLabel} />
                <InfoPill colors={colors} label="Size" value={fileMeta.size} />
                <InfoPill colors={colors} label="Last modified" value={fileMeta.lastModified} />
              </div>
            )}
          </div>

          {/* Description */}
          <div
            style={{
              backgroundColor: colors.cardBg,
              border: `1px solid ${colors.text}18`,
              borderRadius: "18px",
              padding: "18px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <h3 style={{ margin: 0 }}>Description</h3>
              <div style={{ opacity: 0.7, fontSize: "12px", fontWeight: 800 }}>
                {description.length}/{descMax}
              </div>
            </div>

            <p style={{ opacity: 0.8, marginTop: "8px", marginBottom: "10px" }}>
              Add a short note about this file (optional). This can be saved with
              your upload record.
            </p>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value.slice(0, descMax))
              }
              placeholder="Example: Final version for graduation submission (updated references, fixed formatting)."
              rows={4}
              style={{
                width: "100%",
                boxSizing: "border-box",
                resize: "vertical",
                borderRadius: "14px",
                padding: "12px",
                border: `1px solid ${colors.text}25`,
                backgroundColor: colors.pageBg,
                color: colors.text,
                outline: "none",
                lineHeight: 1.5,
              }}
            />
          </div>
        </div>

        {/* CTA */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "18px" }}>
          <button
            onClick={handleUpload}
            disabled={!selectedFile}
            style={{
              backgroundColor: "#ffbf24",
              color: "#1a1a1a",
              padding: "12px 26px",
              fontSize: "15px",
              borderRadius: "999px",
              border: "none",
              cursor: selectedFile ? "pointer" : "not-allowed",
              fontWeight: 900,
              opacity: selectedFile ? 1 : 0.6,
              width: "100%",
              maxWidth: "340px",
              boxShadow: "0 12px 26px rgba(0,0,0,0.18)",
            }}
            type="button"
          >
            Upload Thesis
          </button>
        </div>

        {/* Small helper */}
        <div style={{ textAlign: "center", marginTop: "10px", opacity: 0.65, fontSize: "12px" }}>
          After upload, you will be able to view results inside the report screen (UI-ready).
        </div>
      </div>
    </div>
  );
};

const InfoPill = ({ colors, label, value }) => (
  <div
    style={{
      padding: "12px",
      borderRadius: "14px",
      border: `1px solid ${colors.text}18`,
      backgroundColor: colors.pageBg,
      overflow: "hidden",
    }}
  >
    <div style={{ opacity: 0.75, fontSize: "12px", fontWeight: 900 }}>{label}</div>
    <div
      style={{
        marginTop: "5px",
        fontSize: "14px",
        fontWeight: 900,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
      title={value}
    >
      {value}
    </div>
  </div>
);

export default UploadThesis;
