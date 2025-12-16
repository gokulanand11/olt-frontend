import React from "react";

export default function StatCard({ title, value, hint }) {
  return (
    <div className="card stat">
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
      {hint && <div className="muted" style={{ fontSize: '12px', marginTop: '8px' }}>{hint}</div>}
    </div>
  );
}