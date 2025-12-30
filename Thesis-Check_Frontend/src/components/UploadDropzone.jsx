import React, { useMemo, useRef, useState } from "react";


const UploadDropzone = ({ onFileSelected }) => {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);

  // Theme detection (как у тебя было)
  const isDark = useMemo(() => {
    const body = document.body;
    return (
      body.classList.contains("dark") ||
      body.dataset.theme === "dark" ||
      body.style.backgroundColor === "rgb(2, 20, 52)"
    );
  }, []);

  const colors = useMemo(() => {
    if (isDark) {
      return {
        text: "#F7FAFF",
        muted: "rgba(247,250,255,0.75)",
        cardBg: "rgba(255,255,255,0.06)",
        cardBorder: "rgba(255,255,255,0.14)",
        dashBorder: "rgba(255,255,255,0.35)",
        dashBg: "rgba(255,255,255,0.03)",
        dashHover: "rgba(255,255,255,0.06)",
        shadow: "0 18px 50px rgba(0,0,0,0.35)",
        gold: "#FFC531",
        navy: "#021434",
        infoBg: "rgba(255,197,49,0.12)",
        infoBorder: "rgba(255,197,49,0.32)",
        btnBg: "#FFC531",
        btnText: "#021434",
        subtle: "rgba(255,255,255,0.10)",
      };
    }


    return {
      text: "#021434",
      muted: "rgba(2,20,52,0.72)",
      cardBg: "#ffffff",
      cardBorder: "rgba(2,20,52,0.14)",
      dashBorder: "rgba(2,20,52,0.25)",
      dashBg: "rgba(2,20,52,0.02)",
      dashHover: "rgba(2,20,52,0.05)",
      shadow: "0 14px 34px rgba(2,20,52,0.10)",
      gold: "#FFC531",
      navy: "#021434",
      infoBg: "rgba(255,197,49,0.18)",
      infoBorder: "rgba(2,20,52,0.14)",
      btnBg: "#FFC531",
      btnText: "#021434",
      subtle: "rgba(2,20,52,0.06)",
    };
  }, [isDark]);

  const pickFile = () => inputRef.current?.click();

  const handleFiles = (files) => {
    const f = files?.[0];
    if (!f) return;

    const ok =
      f.type === "application/pdf" ||
      f.type === "application/msword" ||
      f.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      /\.pdf$/i.test(f.name) ||
      /\.docx$/i.test(f.name) ||
      /\.doc$/i.test(f.name);

    if (!ok) {
      alert("Only PDF or Word files are allowed");
      return;
    }

    setFile(f);
    onFileSelected?.(f); // 🔥 ВАЖНО: передаём файл родителю
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const onBrowse = (e) => handleFiles(e.target.files);










  return (
    <div
      style={{
        maxWidth: 980,
        margin: "0 auto",
        padding: "0 18px",
        boxSizing: "border-box",
      }}
    >
      {/* DROPZONE CARD */}
      <div
        style={{
          background: colors.cardBg,
          border: `1px solid ${colors.cardBorder}`,
          borderRadius: 20,
          padding: 22,
          boxShadow: colors.shadow,
          backdropFilter: isDark ? "blur(8px)" : "none",
        }}
      >
        <div
          onClick={pickFile}
          onDragEnter={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          role="button"
          tabIndex={0}
          style={{
            border: `2px dashed ${colors.dashBorder}`,
            background: dragOver ? colors.dashHover : colors.dashBg,
            borderRadius: 18,
            padding: "34px 18px",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 74,
              height: 74,
              borderRadius: 18,
              display: "grid",
              placeItems: "center",
              background: colors.subtle,
              border: `1px solid ${colors.cardBorder}`,
              marginBottom: 14,
            }}
          >
            ☁️⬆️
          </div>

          <div style={{ fontWeight: 950, color: colors.text }}>
            Drag & drop your thesis file here
          </div>
          <div style={{ color: colors.muted, marginTop: 8 }}>
            or click to browse your files
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              pickFile();
            }}
            style={{
              marginTop: 16,
              padding: "10px 18px",
              borderRadius: 999,
              background: colors.btnBg,
              border: "none",
              color: colors.btnText,
              fontWeight: 950,
              cursor: "pointer",
            }}
          >
            Choose File
          </button>

          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={onBrowse}
            style={{ display: "none" }}
          />
        </div>

        {/* INFO */}
        <div
          style={{
            marginTop: 16,
            borderRadius: 14,
            border: `1px solid ${colors.infoBorder}`,
            background: colors.infoBg,
            padding: "14px",
          }}
        >
          <b style={{ color: colors.text }}>Final Template Required</b>
          <div style={{ color: colors.muted, marginTop: 6 }}>
            Accepted formats: <b>.pdf</b> and <b>.docx/.doc</b>
          </div>
        </div>
      </div>

      {/* FILE DETAILS */}
      <div
        style={{
          marginTop: 18,
          background: colors.cardBg,
          border: `1px solid ${colors.cardBorder}`,
          borderRadius: 20,
          padding: 18,
          boxShadow: colors.shadow,
        }}
      >
        <div style={{ fontWeight: 950, color: colors.text }}>
          File Details
        </div>

        {!file ? (
          <div style={{ marginTop: 8, color: colors.muted }}>
            No file selected yet.
          </div>
        ) : (
          <div style={{ marginTop: 10, color: colors.muted }}>
            <div>
              <b>Name:</b> {file.name}
            </div>
            <div>
              <b>Size:</b>{" "}
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </div>
            <div>
              <b>Type:</b> {file.type || "unknown"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadDropzone;