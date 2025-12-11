import React from "react";

export default function ProgressBar({ value = 0 }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="progress">
      <div className="progress-fill" style={{ width: `${v}%` }} />
      <span className="progress-text">{v}%</span>
    </div>
  );
}