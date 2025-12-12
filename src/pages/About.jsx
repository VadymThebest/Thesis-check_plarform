// src/pages/About.js
import React from "react";
import { useTheme } from "../context/ThemeContext";

const About = () => {
  const { colors } = useTheme();

  return (
    <div
      style={{
        backgroundColor: colors.pageBg,
        color: colors.text,
        minHeight: "100vh",
        padding: "60px 0",
      }}
    >
      <div
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "0 32px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "32px", marginBottom: "12px" }}>
          About Thesis Check
        </h1>

        <p
          style={{
            fontSize: "18px",
            maxWidth: "780px",
            margin: "0 auto 40px",
            opacity: 0.9,
            lineHeight: 1.6,
          }}
        >
          Thesis Check is an academic integrity platform that helps students,
          supervisors and institutions review thesis documents for plagiarism
          and AI-generated content, and manage all reports from a single,
          organised workspace.
        </p>

        {/* 3 KUTU */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginBottom: "60px",
          }}
        >
          <Card
            colors={colors}
            title="For Students"
            text="Allows students to check originality before submission, understand similarity scores and improve academic writing."
          />

          <Card
            colors={colors}
            title="For Supervisors"
            text="Provides supervisors with a concise view of plagiarism and AI detection results, highlighting critical sections."
          />

          <Card
            colors={colors}
            title="For Institutions"
            text="Supports universities in applying consistent academic integrity policies and tracking thesis checks."
          />
        </div>

        {/* How it works bölümü */}
        <h2 style={{ fontSize: "26px", marginBottom: "18px" }}>
          How Thesis Check fits into the thesis workflow
        </h2>

        <p
          style={{
            fontSize: "16px",
            maxWidth: "900px",
            margin: "0 auto 40px",
            opacity: 0.9,
            lineHeight: 1.6,
          }}
        >
          Instead of treating plagiarism and AI checks as final steps, Thesis
          Check integrates them into the whole thesis-writing process. Students
          can upload drafts, receive reports, revise their work and upload final
          versions with a clear history of changes.
        </p>

        <Card
          colors={colors}
          title="What Thesis Check offers"
          text={
            <>
              • Plagiarism similarity detection <br />
              • AI-generated content detection <br />
              • Structured PDF & dashboard reports <br />
              • Revision & history tracking <br />
              • Secure, browser-based platform
            </>
          }
        />
      </div>
    </div>
  );
};

const Card = ({ title, text, colors }) => (
  <div
    style={{
      backgroundColor: colors.cardBg,
      borderRadius: "14px",
      border: `1px solid ${colors.text}20`,
      padding: "20px",
      textAlign: "left",
      lineHeight: 1.6,
    }}
  >
    <h3 style={{ marginBottom: "12px", fontSize: "20px" }}>{title}</h3>
    <p style={{ opacity: 0.85 }}>{text}</p>
  </div>
);

export default About;
