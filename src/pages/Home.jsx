import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import heroBg from "../assets/library.jpg";

const Home = () => {
  const { colors, theme } = useTheme();
  const navigate = useNavigate();

  const lightPageBg = "#fff8dc";

  return (
    <div
      style={{
        backgroundColor: theme === "light" ? "transparent" : colors.pageBg,
        color: colors.text,
      }}
    >
      {/* HERO */}
      <section
        style={{
          minHeight: "78vh",
          display: "flex",
          alignItems: "center",
          padding: "70px 20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(2px)",
            opacity: theme === "dark" ? 0.35 : 0.22,
          }}
        />

        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              theme === "dark"
                ? "linear-gradient(90deg, rgba(2,10,30,0.92), rgba(2,10,30,0.75), rgba(2,10,30,0.92))"
                : "linear-gradient(90deg, rgba(255,248,220,0.92), rgba(255,248,220,0.78), rgba(255,248,220,0.92))",
          }}
        />

        {/* CONTENT */}
        <div className="home-hero-wrap" style={{ position: "relative", zIndex: 2 }}>
          {/* LEFT */}
          <div>
            <div
              style={{
                display: "inline-flex",
                gap: 10,
                padding: "8px 14px",
                borderRadius: 999,
                border: `1px solid ${colors.text}25`,
                background: colors.cardBg,
                marginBottom: 18,
                fontSize: 14,
              }}
            >
              <b>Academic Integrity Platform</b>
              <span>•</span>
              <span>Plagiarism + AI Detection</span>
            </div>

            <h1 style={{ fontSize: 56, margin: 0 }}>
              Analyze your thesis with confidence.
            </h1>

            <p style={{ marginTop: 16, fontSize: 18, maxWidth: "58ch" }}>
              Thesis Check helps students and institutions detect plagiarism and
              AI-generated content. Upload your document and track reports in a
              clean dashboard experience.
            </p>

            {/* BUTTONS */}
            <div style={{ display: "flex", gap: 12, marginTop: 26, flexWrap: "wrap" }}>
              <button
                onClick={() => navigate("/upload")}
                style={{
                  background: "#ffbf24",
                  padding: "12px 20px",
                  borderRadius: 999,
                  border: "none",
                  fontWeight: 800,
                }}
              >
                Upload Thesis
              </button>

              <button
                onClick={() => navigate("/about")}
                style={{
                  background: "transparent",
                  padding: "12px 20px",
                  borderRadius: 999,
                  border: `1px solid ${colors.text}35`,
                  fontWeight: 800,
                }}
              >
                Learn More
              </button>

              <button
                onClick={() => navigate("/login")}
                style={{
                  background: colors.cardBg,
                  padding: "12px 20px",
                  borderRadius: 999,
                  border: `1px solid ${colors.text}25`,
                  fontWeight: 800,
                }}
              >
                Log in
              </button>
            </div>

            {/* STATS */}
            <div style={{ display: "flex", gap: 14, marginTop: 26, flexWrap: "wrap" }}>
              {[
                ["Seconds", "Fast checks"],
                ["Dashboard", "Report tracking"],
                ["Final format", "Template ready"],
              ].map(([v, l]) => (
                <div
                  key={v}
                  style={{
                    background: colors.cardBg,
                    border: `1px solid ${colors.text}18`,
                    borderRadius: 14,
                    padding: "12px 14px",
                    minWidth: 170,
                  }}
                >
                  <b>{v}</b>
                  <div style={{ fontSize: 13, opacity: 0.75 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT – React logosu KALDIRILDI */}
          <div
            style={{
              display: "grid",
              gap: 14,
              alignContent: "start",
              paddingTop: 10,
            }}
          >
            <div
              style={{
                background: colors.cardBg,
                border: `1px solid ${colors.text}20`,
                borderRadius: 18,
                padding: 26,
                boxShadow: "0 14px 40px rgba(0,0,0,0.3)",
                maxWidth: 460,
                justifySelf: "end",
              }}
            >
              <h3>What you get</h3>

              {[
                ["Plagiarism Detection", "Similarity score and matched sections."],
                ["AI-Generated Content Check", "Detect AI writing patterns."],
                ["Reports & History", "Track past checks."],
                ["Institution Workflow", "Send reports for review."],
              ].map(([t, d]) => (
                <div
                  key={t}
                  style={{
                    marginTop: 12,
                    padding: 14,
                    borderRadius: 14,
                    background: theme === "light" ? lightPageBg : colors.pageBg,
                    border: `1px solid ${colors.text}18`,
                  }}
                >
                  <b>{t}</b>
                  <div style={{ fontSize: 14, opacity: 0.8 }}>{d}</div>
                </div>
              ))}

              <div style={{ marginTop: 16, fontSize: 13, opacity: 0.75 }}>
                Tip: Use <b>Upload Thesis</b> to start.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESPONSIVE */}
      <style>{`
        .home-hero-wrap {
          max-width: 1200px;
          margin: auto;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 34px;
          align-items: center;
        }

        @media (max-width: 980px) {
          .home-hero-wrap {
            grid-template-columns: 1fr;
          }
          .home-hero-wrap > div:last-child {
            justify-self: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
