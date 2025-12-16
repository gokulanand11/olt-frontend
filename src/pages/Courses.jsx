import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProgressBar from "../components/ProgressBar.jsx";
import api from "../services/api.js";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await api.get("/courses");
        const coursesData = data.map(c => ({
          course_id: c._id,
          title: c.title,
          description: c.description,
          completion: Math.floor(Math.random() * 100),
          instructor: c.instructorId?.name || "Unknown",
          externalUrl: c.externalUrl,
          category: c.title.includes('React') ? 'frontend' : 
                   c.title.includes('Python') ? 'backend' :
                   c.title.includes('HTML') ? 'frontend' :
                   c.title.includes('JavaScript') ? 'frontend' :
                   c.title.includes('Git') ? 'tools' : 'general',
          rating: (4 + Math.random()).toFixed(1),
          students: Math.floor(Math.random() * 10000) + 1000
        }));
        setCourses(coursesData);
        setFilteredCourses(coursesData);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    let filtered = courses.filter(course => 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }
    
    setFilteredCourses(filtered);
  }, [searchTerm, selectedCategory, courses]);

  if (loading) {
    return (
      <div className="card">
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div className="pulsing" style={{ fontSize: '18px' }}>Loading your courses...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>Your Courses ({filteredCourses.length})</h2>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="🔍 Search courses..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '200px', padding: '8px 12px' }}
          />
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ padding: '8px 12px' }}
          >
            <option value="all">All Categories</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="tools">Tools</option>
            <option value="data-science">Data Science</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
      </div>
      
      <div className="grid">
        {filteredCourses.map(c => (
          <div className="card floating" key={c.course_id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <h3 style={{ margin: 0 }}>{c.title}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ color: '#fbbf24' }}>⭐</span>
                <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{c.rating}</span>
              </div>
            </div>
            <p className="muted">{c.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <p className="muted">👨🏫 {c.instructor}</p>
              <p className="muted" style={{ fontSize: '0.8rem' }}>{c.students.toLocaleString()} students</p>
            </div>
            <ProgressBar value={c.completion} />
            <div className="row">
              {c.externalUrl ? (
                <a 
                  href={c.externalUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn primary"
                  style={{ textDecoration: 'none' }}
                >
                  Start Course 🚀
                </a>
              ) : (
                <Link className="btn primary" to={`/courses/${c.course_id}`}>Continue Learning</Link>
              )}
              <Link className="btn" to={`/quiz/${c.course_id}`}>Take Quiz 📝</Link>
            </div>
          </div>
        ))}
      </div>
      
      <div className="card">
        <h3>🔍 Explore Course Catalog</h3>
        <p>Discover 500+ free courses in technology, business, design, and more.</p>
        <div className="row">
          <button className="btn primary">Browse All Courses</button>
          <button className="btn">Popular This Week</button>
          <button className="btn">New Releases</button>
        </div>
      </div>
      
      <div className="card">
        <h3>🎆 Featured Learning Paths</h3>
        <div className="grid" style={{marginTop: '16px'}}>
          <div className="floating" style={{padding: '12px', background: 'var(--card-hover)', borderRadius: '8px'}}>
            <strong>Full Stack Developer</strong>
            <p className="muted">6 courses • 120 hours</p>
          </div>
          <div className="floating" style={{padding: '12px', background: 'var(--card-hover)', borderRadius: '8px', animationDelay: '0.5s'}}>
            <strong>Data Scientist</strong>
            <p className="muted">8 courses • 150 hours</p>
          </div>
          <div className="floating" style={{padding: '12px', background: 'var(--card-hover)', borderRadius: '8px', animationDelay: '1s'}}>
            <strong>Digital Marketer</strong>
            <p className="muted">5 courses • 80 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}