import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await api.get("/assignments");
        setAssignments(data.map(a => ({
          assignment_id: a._id,
          course_id: a.courseId,
          title: a.title,
          deadline: a.deadline,
          status: "pending",
          difficulty: "Medium"
        })));
      } catch (error) {
        console.error("Failed to fetch assignments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  if (loading) {
    return (
      <div className="card">
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '18px' }}>Loading assignments...</div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    return status === 'submitted' ? 'var(--success)' : 'var(--warning)';
  };

  return (
    <div>
      <h2>Your Assignments</h2>
      <div className="grid">
        {assignments.map(a => (
          <div className="card" key={a.assignment_id}>
            <div className="row" style={{ justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3>{a.title}</h3>
              <span style={{ 
                color: getStatusColor(a.status),
                fontWeight: '600',
                textTransform: 'capitalize'
              }}>
                {a.status}
              </span>
            </div>
            <p className="muted"> Course: {a.course_id}</p>
            <p className="muted"> Difficulty: {a.difficulty}</p>
            <p> Due: {new Date(a.deadline).toLocaleDateString()}</p>
            <div className="row">
              <Link className="btn primary" to={`/submissions/${a.assignment_id}`}>
                {a.status === 'submitted' ? 'View Submission' : 'Submit'}
              </Link>
              <button className="btn">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}