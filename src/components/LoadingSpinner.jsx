import React from "react";

export default function LoadingSpinner({ size = "medium", text = "Loading..." }) {
  const sizeMap = {
    small: "20px",
    medium: "40px",
    large: "60px"
  };

  const spinnerStyle = {
    width: sizeMap[size],
    height: sizeMap[size],
    border: "3px solid var(--border)",
    borderTop: "3px solid var(--primary)",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto"
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div style={spinnerStyle}></div>
      <p style={{ marginTop: "16px", color: "var(--muted)" }}>{text}</p>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}