import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProgressBar from "../components/ProgressBar.jsx";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Replace with API: /courses?enrolled=true
    setCourses([
      { course_id: "c1", title: "React Basics", description: "Intro to React", completion: 40 },
      { course_id: "c2", title: "Python Algorithms", description: "Problem solving", completion: 70 },
      { course_id: "c3", title: "Data Modeling", description: "MongoDB schema design", completion: 10 }
    ]);
  }, []);

  return (
    <div>
      <h2>Your courses</h2>
      <div className="grid">
        {courses.map(c => (
          <div className="card" key={c.course_id}>
            <h3>{c.title}</h3>
            <p className="muted">{c.description}</p>
            <ProgressBar value={c.completion} />
            <div className="row">
              <Link className="btn primary" to={`/courses/${c.course_id}`}>Open</Link>
              <button className="btn">Unenroll</button>
            </div>
          </div>
        ))}
      </div>
      <div className="card">
        <h3>Explore catalog</h3>
        <p>Browse and enroll in new courses.</p>
        <button className="btn">Open catalog</button>
      </div>
    </div>
  );
}