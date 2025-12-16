// src/components/LogoAnalytics.jsx

export default function LogoAnalytics({ size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Magnifying Glass Outer Circle */}
      <circle
        cx="26"
        cy="26"
        r="18"
        fill="#ffffff"
        stroke="#0F172A"
        strokeWidth="4"
      />

      {/* Highlight Curve */}
      <path
        d="M18 16 C14 22, 14 30, 18 36"
        fill="none"
        stroke="#0F172A"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
      />

      {/* Handle */}
      <rect
        x="36"
        y="34"
        width="18"
        height="6"
        rx="3"
        fill="#0F172A"
        transform="rotate(45 36 34)"
      />

      {/* Bar Chart */}
      <rect x="16" y="28" width="4" height="10" rx="1" fill="#0F172A" />
      <rect x="22" y="24" width="4" height="14" rx="1" fill="#0F172A" />
      <rect x="28" y="20" width="4" height="18" rx="1" fill="#0F172A" />
      <rect x="34" y="18" width="4" height="20" rx="1" fill="#0F172A" />

      {/* Line Chart */}
      <polyline
        points="16,24 22,20 28,22 34,16"
        fill="none"
        stroke="#0EA5E9"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Line Chart Nodes */}
      <circle cx="16" cy="24" r="2.4" fill="#0EA5E9" />
      <circle cx="22" cy="20" r="2.4" fill="#0EA5E9" />
      <circle cx="28" cy="22" r="2.4" fill="#0EA5E9" />
      <circle cx="34" cy="16" r="2.4" fill="#0EA5E9" />
    </svg>
  );
}
