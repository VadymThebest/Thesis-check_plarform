import React from "react";

const ThesisCheckLogo = ({
  height = 48,
  showText = true,
  text = "THESIS CHECK",
}) => {
  // ikon genişliği ~1:1, yazı ile lockup genişler
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      {/* ICON */}
      <svg
        height={height}
        viewBox="0 0 140 140"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Thesis Check logo"
        style={{ display: "block" }}
      >
        <defs>
          <filter id="ds" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000" floodOpacity="0.25" />
          </filter>

          <linearGradient id="capTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#e9edf4" />
          </linearGradient>

          <linearGradient id="scroll" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#dfe6f2" />
          </linearGradient>

          <linearGradient id="badge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FFC531" />
            <stop offset="1" stopColor="#E7AA12" />
          </linearGradient>
        </defs>

        {/* --- CAP (mortarboard) --- */}
        {/* cap shadow base */}
        <path
          d="M38 46 L70 30 L102 46 L70 62 Z"
          fill="#0b1630"
          opacity="0.35"
          transform="translate(0,6)"
        />

        {/* top */}
        <path
          d="M28 48 L70 26 L112 48 L70 70 Z"
          fill="url(#capTop)"
          filter="url(#ds)"
        />
        {/* top outline */}
        <path
          d="M28 48 L70 26 L112 48 L70 70 Z"
          fill="none"
          stroke="#0b1630"
          strokeOpacity="0.25"
          strokeWidth="2.5"
        />

        {/* cap band */}
        <path
          d="M44 66 L70 78 L96 66 L96 78 C96 88 83 96 70 96 C57 96 44 88 44 78 Z"
          fill="#f7f9fd"
          stroke="#0b1630"
          strokeOpacity="0.18"
          strokeWidth="2"
        />

        {/* tassel */}
        <path
          d="M108 52 C112 60 112 72 108 82"
          stroke="#FFC531"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="108" cy="90" r="8" fill="url(#badge)" filter="url(#ds)" />

        {/* --- SCROLL / RIBBON behind badge --- */}
        {/* left ribbon */}
        <path
          d="M18 98
             C30 86, 50 86, 62 98
             C52 104, 38 108, 24 110
             C18 106, 16 102, 18 98 Z"
          fill="url(#scroll)"
          stroke="#0b1630"
          strokeOpacity="0.18"
          strokeWidth="2"
          filter="url(#ds)"
        />
        {/* right ribbon */}
        <path
          d="M78 98
             C90 86, 110 86, 122 98
             C124 102, 122 106, 116 110
             C102 108, 88 104, 78 98 Z"
          fill="url(#scroll)"
          stroke="#0b1630"
          strokeOpacity="0.18"
          strokeWidth="2"
          filter="url(#ds)"
        />
        {/* center ribbon bridge */}
        <path
          d="M34 100
             C48 92, 92 92, 106 100
             C92 112, 48 112, 34 100 Z"
          fill="#f7f9fd"
          stroke="#0b1630"
          strokeOpacity="0.12"
          strokeWidth="2"
        />

        {/* --- BADGE (front) --- */}
        <circle cx="52" cy="104" r="28" fill="url(#badge)" filter="url(#ds)" />
        {/* badge inner ring */}
        <circle cx="52" cy="104" r="22" fill="none" stroke="#0b1630" strokeOpacity="0.12" strokeWidth="3" />

        {/* check mark */}
        <path
          d="M40 104 L48 112 L66 92"
          fill="none"
          stroke="#0b1630"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* small highlight on badge */}
        <path
          d="M40 92 C44 86, 56 84, 62 88"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.55"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>

      {/* TEXT */}
      {showText && (
        <span
          style={{
            fontWeight: 900,
            letterSpacing: 1.5,
            fontSize: Math.max(18, Math.round(height * 0.52)),
            lineHeight: 1,
            color: "white",
            fontFamily: "Georgia, 'Times New Roman', serif",
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </span>
      )}
    </div>
  );
};

export default ThesisCheckLogo;
