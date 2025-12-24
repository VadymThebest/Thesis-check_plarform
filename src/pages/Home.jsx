import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import logo from "../logo.svg";
import heroBg from "../assets/library.jpg";

const Home = () => {
  const { colors, theme } = useTheme();
  const navigate = useNavigate();

  // Layout ile aynı açık krem tonu (sen Layout'ta ne kullandıysan bunu da ona eşitle)
  const lightPageBg = "#fff8dc";

  return (
    <div
      style={{
        backgroundColor: theme === "light" ? "transparent" : colors.pageBg,
        color: colors.text,
      }}
    >
      {/* HERO / MAIN PART */}
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
        {/* Background Image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "scale(1.02)",
            filter: "blur(2px)",
            opacity: theme === "dark" ? 0.35 : 0.22,
          }}
        />

        {/* Overlay for readability (LIGHT'ta beyaz değil krem) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              theme === "dark"
                ? "linear-gradient(90deg, rgba(2,10,30,0.92) 0%, rgba(2,10,30,0.75) 45%, rgba(2,10,30,0.92) 100%)"
                : `linear-gradient(90deg,
                    rgba(255,248,220,0.92) 0%,
                    rgba(255,248,220,0.78) 45%,
                    rgba(255,248,220,0.92) 100%)`,
          }}
        />

        {/* Content */}
        <div className="home-hero-wrap" style={{ position: "relative", zIndex: 2 }}>
          {/* LEFT */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 14px",
                borderRadius: "999px",
                border: `1px solid ${colors.text}25`,
                backgroundColor: colors.cardBg,
                marginBottom: "18px",
                fontSize: "14px",
                opacity: 0.95,
                backdropFilter: "blur(6px)",
              }}
            >
              <span style={{ fontWeight: 800 }}>Academic Integrity Platform</span>
              <span style={{ opacity: 0.7 }}>•</span>
              <span style={{ opacity: 0.85 }}>Plagiarism + AI Detection</span>
            </div>

            <h1
              style={{
                fontSize: "56px",
                lineHeight: 1.05,
                margin: 0,
                letterSpacing: "-0.5px",
              }}
            >
              Analyze your thesis with confidence.
            </h1>

            <p
              style={{
                marginTop: "16px",
                fontSize: "18px",
                lineHeight: 1.6,
                opacity: 0.9,
                maxWidth: "58ch",
              }}
            >
              Thesis Check helps students and institutions detect plagiarism and
              AI-generated content. Upload your document and track reports in a
              clean dashboard experience.
            </p>

            {/* CTA Buttons */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "26px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => navigate("/upload")}
                style={{
                  backgroundColor: "#ffbf24",
                  color: "#1a1a1a",
                  padding: "12px 20px",
                  borderRadius: "999px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 800,
                  fontSize: "15px",
                }}
              >
                Upload Thesis
              </button>

              <button
                onClick={() => navigate("/about")}
                style={{
                  backgroundColor: "transparent",
                  color: colors.text,
                  padding: "12px 20px",
                  borderRadius: "999px",
                  border: `1px solid ${colors.text}35`,
                  cursor: "pointer",
                  fontWeight: 800,
                  fontSize: "15px",
                  backdropFilter: "blur(6px)",
                }}
              >
                Learn More
              </button>

              <button
                onClick={() => navigate("/login")}
                style={{
                  backgroundColor: colors.cardBg,
                  color: colors.text,
                  padding: "12px 20px",
                  borderRadius: "999px",
                  border: `1px solid ${colors.text}25`,
                  cursor: "pointer",
                  fontWeight: 800,
                  fontSize: "15px",
                }}
              >
                Log in
              </button>
            </div>

            {/* Quick stats row */}
            <div
              style={{
                marginTop: "26px",
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
                opacity: 0.95,
              }}
            >
              {[
                { label: "Fast checks", value: "Seconds" },
                { label: "Report tracking", value: "Dashboard" },
                { label: "Template ready", value: "Final format" },
              ].map((x) => (
                <div
                  key={x.label}
                  style={{
                    backgroundColor: colors.cardBg,
                    border: `1px solid ${colors.text}18`,
                    borderRadius: "14px",
                    padding: "12px 14px",
                    minWidth: "170px",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  <div style={{ fontWeight: 900, fontSize: "16px" }}>{x.value}</div>
                  <div style={{ opacity: 0.75, fontSize: "13px", marginTop: "2px" }}>
                    {x.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ display: "grid", gap: "14px" }}>
            <div
              style={{
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.text}20`,
                borderRadius: "18px",
                padding: "18px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 14px 40px rgba(0,0,0,0.22)",
                backdropFilter: "blur(6px)",
              }}
            >
              <img
                src={logo}
                alt="Thesis Check"
                style={{
                  width: "100%",
                  maxWidth: "320px",
                  height: "auto",
                  opacity: 0.95,
                  filter:
                    theme === "dark"
                      ? "drop-shadow(0 10px 24px rgba(0,0,0,0.35))"
                      : "none",
                }}
              />
            </div>

            <div
              style={{
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.text}20`,
                borderRadius: "18px",
                padding: "22px",
                boxShadow: "0 14px 40px rgba(0,0,0,0.30)",
                backdropFilter: "blur(6px)",
              }}
            >
              <h3 style={{ marginTop: 0, marginBottom: "12px" }}>What you get</h3>

              <div style={{ display: "grid", gap: "12px" }}>
                {[
                  { title: "Plagiarism Detection", desc: "Similarity score and matched sections." },
                  { title: "AI-Generated Content Check", desc: "Detect AI writing patterns and risk signals." },
                  { title: "Reports & History", desc: "Track your past checks and compare results." },
                  { title: "Institution Workflow", desc: "Send reports for review (UI-ready)." },
                ].map((item) => (
                  <div
                    key={item.title}
                    style={{
                      padding: "14px",
                      borderRadius: "14px",
                      border: `1px solid ${colors.text}18`,
                      // Burada pageBg kullanıyordun → light'ta beyaza çekiyordu.
                      // Light'ta krem, dark'ta mevcut pageBg.
                      backgroundColor: theme === "light" ? lightPageBg : colors.pageBg,
                    }}
                  >
                    <div style={{ fontWeight: 900 }}>{item.title}</div>
                    <div style={{ opacity: 0.8, marginTop: "6px", fontSize: "14px" }}>
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "16px", opacity: 0.75, fontSize: "13px" }}>
                Tip: Use <b>Upload Thesis</b> to start an analysis.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECOND SECTION */}
      <section style={{ padding: "50px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "32px", margin: 0 }}>How it works</h2>
          <p style={{ opacity: 0.8, marginTop: "10px", lineHeight: 1.6 }}>
            A simple flow for students and institutions.
          </p>

          <div
            style={{
              marginTop: "18px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "16px",
            }}
          >
            {[
              { step: "1", title: "Upload", desc: "Upload a PDF/DOCX thesis." },
              { step: "2", title: "Analyze", desc: "Check plagiarism and AI content." },
              { step: "3", title: "Review", desc: "See report and highlighted parts." },
              { step: "4", title: "Send", desc: "Send to institute (workflow)." },
            ].map((x) => (
              <div
                key={x.step}
                style={{
                  backgroundColor: colors.cardBg,
                  border: `1px solid ${colors.text}18`,
                  borderRadius: "16px",
                  padding: "18px",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "12px",
                    display: "grid",
                    placeItems: "center",
                    backgroundColor: "rgba(255,191,36,0.15)",
                    border: "1px solid rgba(255,191,36,0.35)",
                    fontWeight: 900,
                  }}
                >
                  {x.step}
                </div>
                <div style={{ marginTop: "10px", fontWeight: 900, fontSize: "16px" }}>
                  {x.title}
                </div>
                <div style={{ opacity: 0.8, marginTop: "6px", fontSize: "14px", lineHeight: 1.5 }}>
                  {x.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .home-hero-wrap {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 34px;
          align-items: center;
        }

        @media (max-width: 980px) {
          .home-hero-wrap {
            grid-template-columns: 1fr;
          }

          .home-hero-wrap h1 {
            font-size: 44px !important;
          }
        }

        @media (max-width: 520px) {
          .home-hero-wrap h1 {
            font-size: 36px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
