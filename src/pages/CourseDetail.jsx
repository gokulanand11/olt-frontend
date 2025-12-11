import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProgressBar from "../components/ProgressBar.jsx";

export default function CourseDetail() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // Replace with API: /courses/:courseId (modules, lessons, assessments)
    setCourse({
      course_id: courseId,
      title: "React Basics",
      description: "Intro to React",
      modules: [
        { module_id: "m1", title: "Fundamentals", lessons: [
          { lesson_id: "l1", title: "Components", duration: 15, completed: true },
          { lesson_id: "l2", title: "JSX & Props", duration: 20, completed: false },
        ]},
        { module_id: "m2", title: "State & Effects", lessons: [
          { lesson_id: "l3", title: "useState", duration: 18, completed: false },
          { lesson_id: "l4", title: "useEffect", duration: 22, completed: false },
        ]}
      ],
      assessments: [{ assessment_id: "a1", title: "React Basics Quiz", pass_mark: 70 }]
    });
  }, [courseId]);

  const completion = useMemo(() => {
    if (!course) return 0;
    const lessons = course.modules.flatMap(m => m.lessons);
    const done = lessons.filter(l => l.completed).length;
    return Math.round((done / lessons.length) * 100);
  }, [course]);

  if (!course) return <div>Loading...</div>;

  return (
    <div>
      <h2>{course.title}</h2>
      <p className="muted">{course.description}</p>
      <ProgressBar value={completion} />

      <div className="grid">
        {course.modules.map(m => (
          <div className="card" key={m.module_id}>
            <h3>{m.title}</h3>
            <ul className="list">
              {m.lessons.map(l => (
                <li key={l.lesson_id} className={l.completed ? "done" : ""}>
                  <span>{l.title} — {l.duration} min</span>
                  <div className="row">
                    <button className="btn" onClick={() => alert(`Open ${l.title}`)}>Open</button>
                    <button className="btn" onClick={() => alert("Marked complete")}>Mark complete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Assessments</h3>
        {course.assessments.map(a => (
          <div key={a.assessment_id} className="row">
            <span>{a.title}</span>
            <Link className="btn primary" to={`/quiz/${a.assessment_id}`}>Start quiz</Link>
          </div>
        ))}
      </div>
    </div>
  );
}