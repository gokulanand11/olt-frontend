import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProgressBar from "../components/ProgressBar.jsx";
import api from "../services/api.js";

export default function CourseDetail() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        console.log('Fetching course:', courseId);
        const data = await api.get(`/courses/${courseId}`);
        console.log('Course data:', data);
        setCourse({
          course_id: data._id,
          title: data.title,
          description: data.description,
          modules: data.modules?.map(m => ({
            module_id: m._id,
            title: m.title,
            lessons: m.lessons?.map(l => ({
              lesson_id: l._id,
              title: l.title,
              duration: l.duration,
              completed: false
            })) || []
          })) || [],
          assessments: []
        });
      } catch (error) {
        console.error("Failed to fetch course:", error);
        setCourse({
          course_id: courseId,
          title: "Course Not Found",
          description: "This course could not be loaded.",
          modules: [],
          assessments: []
        });
      } finally {
        setLoading(false);
      }
    };
    if (courseId) fetchCourse();
  }, [courseId]);

  const completion = useMemo(() => {
    if (!course) return 0;
    const lessons = course.modules.flatMap(m => m.lessons);
    const done = lessons.filter(l => l.completed).length;
    return Math.round((done / lessons.length) * 100);
  }, [course]);

  if (loading) return (
    <div className="card">
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ fontSize: '18px' }}>Loading course details...</div>
      </div>
    </div>
  );

  if (!course) return (
    <div className="card">
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ fontSize: '18px' }}>Course not found</div>
      </div>
    </div>
  );

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