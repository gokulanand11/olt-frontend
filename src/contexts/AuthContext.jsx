import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // { id, name, email, role, token }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Attempt restore from localStorage
    const raw = localStorage.getItem("auth");
    if (raw) {
      const parsed = JSON.parse(raw);
      api.setToken(parsed.token);
      setUser(parsed);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const auth = { ...res.user, token: res.token };
    localStorage.setItem("auth", JSON.stringify(auth));
    api.setToken(res.token);
    setUser(auth);
    return auth;
  };

  const signup = async (payload) => {
    const res = await api.post("/auth/signup", payload);
    const auth = { ...res.user, token: res.token };
    localStorage.setItem("auth", JSON.stringify(auth));
    api.setToken(res.token);
    setUser(auth);
    return auth;
  };

  const logout = () => {
    localStorage.removeItem("auth");
    api.setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}