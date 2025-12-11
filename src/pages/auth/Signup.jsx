import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import api from "../../services/api.js";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [payload, setPayload] = useState({ name: "", email: "", password: "", role: "learner" });
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with: await signup(payload) when backend ready
      const res = await api.mockSignup(payload);
      localStorage.setItem("auth", JSON.stringify({ ...res.user, token: res.token }));
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div className="card form-card">
      <h2>Sign up</h2>
      {error && <div className="alert error">{error}</div>}
      <form onSubmit={onSubmit} className="form">
        <label>Name
          <input value={payload.name} onChange={e => setPayload({ ...payload, name: e.target.value })} required />
        </label>
        <label>Email
          <input type="email" value={payload.email} onChange={e => setPayload({ ...payload, email: e.target.value })} required />
        </label>
        <label>Password
          <input type="password" value={payload.password} onChange={e => setPayload({ ...payload, password: e.target.value })} required />
        </label>
        <label>Role
          <select value={payload.role} onChange={e => setPayload({ ...payload, role: e.target.value })}>
            <option value="learner">Learner</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <button className="btn primary" type="submit">Create account</button>
      </form>
    </div>
  );
}