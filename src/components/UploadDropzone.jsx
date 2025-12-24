import React, { useMemo, useRef, useState } from "react";

const UploadDropzone = () => {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);

  // Basit theme algısı (senin projende ThemeContext varsa bile bunu bozmaz)
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
      f.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      f.type === "application/msword" ||
      /\.pdf$/i.test(f.name) ||
      /\.docx$/i.test(f.name) ||
      /\.doc$/i.test(f.name);

    if (!ok) {
      alert("Lütfen sadece .pdf veya .docx/.doc dosyası yükleyin.");
      return;
    }

    setFile(f);
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
        {/* DROPZONE */}
        <div
          onClick={pickFile}
          onDragEnter={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragOver(true);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragOver(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragOver(false);
          }}
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
            transition: "background 120ms ease, border-color 120ms ease",
          }}
        >
          {/* ICON BOX */}
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
            {/* Cloud Upload SVG */}
            <svg
              width="42"
              height="42"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M7 18H6a4 4 0 0 1 0-8 5.5 5.5 0 0 1 10.7-1.6A4.5 4.5 0 0 1 18 18h-1"
                stroke={colors.text}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.92"
              />
              <path
                d="M12 14V21"
                stroke={colors.gold}
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M9 16l3-3 3 3"
                stroke={colors.gold}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div style={{ fontWeight: 950, color: colors.text, fontSize: 16 }}>
            Drag &amp; drop your thesis file here
          </div>
          <div style={{ color: colors.muted, marginTop: 8, fontSize: 14 }}>
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
              boxShadow: isDark
                ? "0 10px 22px rgba(0,0,0,0.35)"
                : "0 10px 22px rgba(2,20,52,0.12)",
            }}
          >
            Choose File
          </button>

          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={onBrowse}
            style={{ display: "none" }}
          />
        </div>

        {/* INFO STRIP */}
        <div
          style={{
            marginTop: 16,
            borderRadius: 14,
            border: `1px solid ${colors.infoBorder}`,
            background: colors.infoBg,
            padding: "14px 14px",
          }}
        >
          <div style={{ fontWeight: 950, color: colors.text, marginBottom: 6 }}>
            Final Template Required
          </div>
          <div style={{ color: colors.muted, fontSize: 14, lineHeight: 1.5 }}>
            Accepted formats: <b>.pdf</b> and <b>.docx/.doc</b>. Please upload the{" "}
            <b>FINAL</b> formatted version you will submit to the institute.
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
          backdropFilter: isDark ? "blur(8px)" : "none",
        }}
      >
        <div style={{ fontWeight: 950, color: colors.text, fontSize: 18 }}>
          File Details
        </div>

        {!file ? (
          <div style={{ marginTop: 8, color: colors.muted }}>
            No file selected yet.
          </div>
        ) : (
          <div
            style={{
              marginTop: 12,
              display: "grid",
              gap: 8,
              color: colors.muted,
              fontSize: 14,
            }}
          >
            <div>
              <b style={{ color: colors.text }}>Name:</b> {file.name}
            </div>
            <div>
              <b style={{ color: colors.text }}>Size:</b>{" "}
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </div>
            <div>
              <b style={{ color: colors.text }}>Type:</b> {file.type || "unknown"}
            </div>

            <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
              <button
                type="button"
                onClick={() => setFile(null)}
                style={{
                  padding: "10px 14px",
                  borderRadius: 12,
                  border: `1px solid ${colors.cardBorder}`,
                  background: "transparent",
                  color: colors.text,
                  cursor: "pointer",
                  fontWeight: 900,
                }}
              >
                Remove
              </button>

              <button
                type="button"
                onClick={() => alert("Buraya upload aksiyonunu bağlayacaksın.")}
                style={{
                  padding: "10px 14px",
                  borderRadius: 12,
                  border: "none",
                  background: isDark ? colors.gold : colors.navy,
                  color: isDark ? colors.navy : "#fff",
                  cursor: "pointer",
                  fontWeight: 950,
                }}
              >
                Upload
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadDropzone;
