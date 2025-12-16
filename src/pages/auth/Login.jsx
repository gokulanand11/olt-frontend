import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card form-card">
      <h2>Login</h2>
      {error && <div className="alert error">{error}</div>}
      <form onSubmit={onSubmit} className="form">
        <label>Email
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        <label>Password
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        <button className="btn primary" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <p style={{ textAlign: 'center', marginTop: '16px', color: 'var(--muted)' }}>
          Don't have an account? <a href="/signup" style={{ color: 'var(--primary)' }}>Sign up here</a>
        </p>
        <div style={{ marginTop: '20px', padding: '12px', background: 'var(--card)', borderRadius: '8px', fontSize: '14px' }}>
          <strong>Demo Accounts:</strong><br/>
          Learner: learner@test.com / password123<br/>
          Admin: admin@test.com / password123
        </div>
      </form>
    </div>
  );
}