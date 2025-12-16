import React, { useState } from "react";
import api from "../services/api.js";

export default function AdminPanel() {
  const [course, setCourse] = useState({ title: "", description: "", modules: [] });
  const [loading, setLoading] = useState(false);

  const addModule = () => {
    setCourse({ ...course, modules: [...course.modules, { title: "", lessons: [] }] });
  };
  const saveCourse = async () => {
    if (!course.title.trim()) {
      alert("Course title is required");
      return;
    }
    setLoading(true);
    try {
      await api.post("/courses", course);
      alert("Course created successfully!");
      setCourse({ title: "", description: "", modules: [] });
    } catch (error) {
      alert("Failed to create course: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Admin panel</h2>
      <div className="card form-card">
        <label>Course title
          <input value={course.title} onChange={e => setCourse({ ...course, title: e.target.value })} />
        </label>
        <label>Description
          <textarea value={course.description} onChange={e => setCourse({ ...course, description: e.target.value })} />
        </label>
        <button className="btn" onClick={addModule}>Add module</button>
        {course.modules.map((m, mi) => (
          <div key={mi} className="card nested">
            <label>Module title
              <input value={m.title} onChange={e => {
                const modules = [...course.modules];
                modules[mi].title = e.target.value;
                setCourse({ ...course, modules });
              }} />
            </label>
            <button className="btn" onClick={() => alert("Add lessons UI")}>Add lesson</button>
          </div>
        ))}
        <button className="btn primary" onClick={saveCourse} disabled={loading}>
          {loading ? "Publishing..." : "Publish course"}
        </button>
      </div>
    </div>
  );
}