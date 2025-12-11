import React from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function RoleGate({ roles = [], children }) {
  const { user } = useAuth();
  if (!user || !roles.includes(user.role)) {
    return <div className="card warn">Access restricted for your role.</div>;
  }
  return children;
}