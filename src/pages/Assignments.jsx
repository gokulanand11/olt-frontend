import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    // Replace with /assignments?user=me
    setAssignments([
      { assignment_id: "as1", course_id: "c1", title: "Component Library", deadline: "2025-12-20", attachments: [] },
      { assignment_id: "as2", course_id: "c2", title: "Algorithm Analysis", deadline: "2025-12-22", attachments: [] },
    ]);
  }, []);

  return (
    <div>
      <h2>Your assignments</h2>
      <div className="grid">
        {assignments.map(a => (
          <div className="card" key={a.assignment_id}>
            <h3>{a.title}</h3>
            <p className="muted">Course: {a.course_id}</p>
            <p>Due: {a.deadline}</p>
            <div className="row">
              <Link className="btn primary" to={`/submissions/${a.assignment_id}`}>Submit</Link>
              <button className="btn">View rubric</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}