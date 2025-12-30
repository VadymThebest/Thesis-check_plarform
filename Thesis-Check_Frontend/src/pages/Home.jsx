// src/pages/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import heroBg from "../assets/library.jpg";

const Home = () => {
  const { colors, theme } = useTheme();
  const navigate = useNavigate();

  const lightCardInnerBg = "#fff8dc";

  return (
    <div
      style={{
        backgroundColor: theme === "light" ? "transparent" : colors.pageBg,
        color: colors.text,
      }}
    >
      {/* HERO SECTION */}
      <section
        style={{
          minHeight: "85vh",
          display: "flex",
          alignItems: "center",
          padding: "70px 20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "scale(1.05)",
            filter: "blur(3px)",
            opacity: theme === "dark" ? 0.3 : 0.15,
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              theme === "dark"
                ? "linear-gradient(90deg, rgba(2,10,30,0.95) 0%, rgba(2,10,30,0.8) 50%, rgba(2,10,30,0.95) 100%)"
                : `linear-gradient(90deg, rgba(255,248,220,0.95) 0%, rgba(255,248,220,0.85) 50%, rgba(255,248,220,0.95) 100%)`,
            zIndex: 1,
          }}
        />

        <div className="home-hero-wrap" style={{ position: "relative", zIndex: 2 }}>
          
          {/* LEFT COLUMN */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 16px",
                borderRadius: "999px",
                border: `1px solid ${colors.text}20`,
                backgroundColor: colors.cardBg,
                marginBottom: "24px",
                fontSize: "14px",
                backdropFilter: "blur(8px)",
              }}
            >
              <span style={{ fontWeight: 800 }}>Academic Integrity Platform</span>
              <span style={{ opacity: 0.5 }}>•</span>
              <span style={{ opacity: 0.8 }}>Plagiarism + AI Detection</span>
            </div>

            <h1
              style={{
                fontSize: "56px",
                lineHeight: 1.1,
                margin: 0,
                fontWeight: 800,
                letterSpacing: "-1px",
              }}
            >
              Analyze your thesis with <span style={{ color: "#ffbf24" }}>confidence.</span>
            </h1>

            <p
              style={{
                marginTop: "20px",
                fontSize: "18px",
                lineHeight: "1.6",
                opacity: 0.9,
                maxWidth: "60ch",
              }}
            >
              Thesis Check helps students and institutions detect plagiarism and
              AI-generated content. Upload your document and track reports in a
              clean dashboard experience.
            </p>

            {/* BUTTONS (Added Log in) */}
            <div style={{ display: "flex", gap: "12px", marginTop: "32px", flexWrap: "wrap" }}>
              <button
                onClick={() => navigate("/upload")}
                style={{
                  backgroundColor: "#ffbf24",
                  color: "#1a1a1a",
                  padding: "14px 28px",
                  borderRadius: "999px", // Круглые как на скрине
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
                  padding: "14px 28px",
                  borderRadius: "999px",
                  border: `1px solid ${colors.text}35`,
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: "15px",
                  backdropFilter: "blur(4px)",
                }}
              >
                Learn More
              </button>

              <button
                onClick={() => navigate("/login")}
                style={{
                  backgroundColor: colors.cardBg,
                  color: colors.text,
                  padding: "14px 28px",
                  borderRadius: "999px",
                  border: `1px solid ${colors.text}25`,
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: "15px",
                }}
              >
                Log in
              </button>
            </div>

            {/* STATS BADGES */}
            <div style={{ marginTop: "40px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {[
                { label: "Fast checks", value: "Seconds" },
                { label: "Report tracking", value: "Dashboard" },
                { label: "Template ready", value: "Final format" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    backgroundColor: colors.cardBg,
                    border: `1px solid ${colors.text}15`,
                    borderRadius: "14px",
                    padding: "12px 20px",
                    minWidth: "150px",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: "16px" }}>{stat.value}</div>
                  <div style={{ opacity: 0.6, fontSize: "13px", marginTop: "2px" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ display: "grid", gap: "20px" }}>
            <div
              style={{
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.text}15`,
                borderRadius: "24px",
                padding: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                backdropFilter: "blur(10px)",
              }}
            >
              <img
                src="https://t3.ftcdn.net/jpg/04/66/94/24/360_F_466942464_u0Oo1eNuZrQG7M3Y2EWayJHfxqQudz0U.jpg"
                alt="Thesis Check Logo"
                style={{ width: "100%", maxWidth: "340px", borderRadius: "12px" }}
              />
            </div>

            {/* WHAT YOU GET (Added Workflow and Tip) */}
            <div
              style={{
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.text}15`,
                borderRadius: "24px",
                padding: "24px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                backdropFilter: "blur(10px)",
              }}
            >
              <h3 style={{ marginTop: 0, marginBottom: "16px", fontSize: "20px" }}>What you get</h3>
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
                      border: `1px solid ${colors.text}10`,
                      backgroundColor: theme === "light" ? lightCardInnerBg : colors.pageBg,
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: "15px" }}>{item.title}</div>
                    <div style={{ opacity: 0.7, fontSize: "13px", marginTop: "4px" }}>{item.desc}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "16px", opacity: 0.6, fontSize: "13px" }}>
                Tip: Use <b>Upload Thesis</b> to start an analysis.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section style={{ padding: "80px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", margin: 0, fontWeight: 800 }}>How it works</h2>
          <p style={{ opacity: 0.7, marginTop: "8px", fontSize: "18px" }}>
            A simple flow for students and institutions.
          </p>

          <div
            style={{
              marginTop: "40px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
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
                  border: `1px solid ${colors.text}10`,
                  borderRadius: "20px",
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                    display: "grid",
                    placeItems: "center",
                    backgroundColor: "rgba(255,191,36,0.2)",
                    color: "#ffbf24",
                    fontWeight: 900,
                    fontSize: "18px",
                    marginBottom: "16px",
                  }}
                >
                  {x.step}
                </div>
                <div style={{ fontWeight: 800, fontSize: "18px" }}>{x.title}</div>
                <div style={{ opacity: 0.7, marginTop: "8px", fontSize: "15px", lineHeight: 1.5 }}>
                  {x.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: "80px 20px",
          textAlign: "center",
          borderTop: `1px solid ${colors.text}10`,
        }}
      >
        <h2 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "20px" }}>
          Contact Support
        </h2>
        <p style={{ fontSize: "18px", marginBottom: "10px" }}>
          <a href="mailto:support@thesischeck.com" style={{ color: colors.text, textDecoration: "none", opacity: 0.8 }}>
            support@thesischeck.com
          </a>
        </p>
        <p style={{ fontSize: "16px", opacity: 0.6 }}>
          Mon - Fri | 09:00 - 18:00
        </p>
      </footer>

      <style>{`
        .home-hero-wrap {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 50px;
          align-items: center;
        }

        @media (max-width: 1024px) {
          .home-hero-wrap {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .home-hero-wrap div {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .home-hero-wrap h1 {
            font-size: 42px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;