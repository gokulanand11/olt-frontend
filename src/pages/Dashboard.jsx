import React from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import StatCard from "../components/StatCard.jsx";

export default function Dashboard() {
  const { user } = useAuth();

  // Placeholder stats; replace with API-driven metrics
  const stats = [
    { title: "Courses enrolled", value: 4 },
    { title: "Avg completion", value: "62%" },
    { title: "Streak", value: "7 days" },
    { title: "Assignments due", value: 2 }
  ];

  return (
    <div>
      <h2>Welcome, {user?.name}</h2>
      <div className="grid">
        {stats.map(s => <StatCard key={s.title} title={s.title} value={s.value} />)}
      </div>
      <div className="card">
        <h3>Today’s goal</h3>
        <p>Complete 2 lessons in “React Basics”.</p>
        <button className="btn">Mark as done</button>
      </div>
    </div>
  );
}