import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import StatCard from "../components/StatCard.jsx";

export default function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setStats([
        { title: "Courses Enrolled", value: 8, hint: "+3 this month" },
        { title: "Completion Rate", value: "78%", hint: "Above average" },
        { title: "Learning Streak", value: "12 days", hint: "Personal best!" },
        { title: "Certificates", value: 3, hint: "2 pending" },
        { title: "Study Hours", value: "45h", hint: "This month" },
        { title: "Assignments Due", value: 5, hint: "Next 7 days" }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="card">
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '18px' }}>Loading your dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>Welcome back, {user?.name}! </h2>
      <div className="grid">
        {stats.map(s => <StatCard key={s.title} title={s.title} value={s.value} hint={s.hint} />)}
      </div>
      <div className="card">
        <h3>🎯 Today's Learning Goals</h3>
        <p>Complete "Modern JavaScript ES6+" Module 2 and submit your weather app project.</p>
        <div className="row">
          <button className="btn primary">Continue Learning</button>
          <button className="btn">View All Goals</button>
        </div>
      </div>
      <div className="card">
        <h3>🏆 Recent Achievements</h3>
        <ul className="list">
          <li>✅ Completed "React Fundamentals" - 2 days ago</li>
          <li>🎖️ Earned "JavaScript Expert" badge - 1 week ago</li>
          <li>📊 Reached 100 study hours milestone - 2 weeks ago</li>
        </ul>
      </div>
    </div>
  );
}