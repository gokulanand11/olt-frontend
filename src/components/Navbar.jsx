import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="brand">Online Learning Tracker</div>
      <div className="nav-links">
        {user ? (
          <>
            <Link to="/">📊 Dashboard</Link>
            <Link to="/courses">📚 Courses</Link>
            <Link to="/assignments">📝 Assignments</Link>
            {user.role === "admin" && <Link to="/admin">⚙️ Admin</Link>}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>👋 {user.name}</span>
              <button className="btn" onClick={handleLogout}>Logout</button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}