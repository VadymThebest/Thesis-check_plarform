import React from "react";
import { useTheme } from "../context/ThemeContext";

const ChecksHistory = () => {
  const { colors } = useTheme();

  const historyData = [
    { date: "April 25, 2024", type: "Plagiarism", score: "84%", status: "Completed" },
    { date: "April 24, 2024", type: "AI Detection", score: "17%", status: "Completed" },
    { date: "April 22, 2024", type: "Plagiarism", score: "23%", status: "Completed" },
    { date: "April 20, 2024", type: "AI Detection", score: "41%", status: "Completed" },
  ];

  return (
    <div
      style={{
        backgroundColor: colors.pageBg,
        color: colors.text,
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>Checks History</h1>

        <div
          style={{
            backgroundColor: colors.cardBg,
            padding: "20px",
            borderRadius: "14px",
            border: `1px solid ${colors.text}25`,
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr style={{ borderBottom: `1px solid ${colors.text}30` }}>
                <th style={styles.header}>Date</th>
                <th style={styles.header}>Type</th>
                <th style={styles.header}>Score</th>
                <th style={styles.header}>Status</th>
              </tr>
            </thead>

            <tbody>
              {historyData.map((row, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: `1px solid ${colors.text}20`,
                  }}
                >
                  <td style={styles.cell}>{row.date}</td>
                  <td style={styles.cell}>{row.type}</td>
                  <td style={styles.cell}>{row.score}</td>
                  <td style={styles.cell}>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const styles = {
  header: {
    textAlign: "left",
    padding: "10px 0",
    fontWeight: 600,
  },
  cell: {
    padding: "10px 0",
    opacity: 0.9,
  },
};

export default ChecksHistory;
