// Minimal wrapper; replace mock with actual fetch/axios when wiring backend
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

let token = null;

function headers() {
  const h = { "Content-Type": "application/json" };
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { ...headers(), ...(options.headers || {}) }
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || `HTTP ${res.status}`);
  }
  return res.json();
}

const api = {
  setToken: t => (token = t),
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: "PUT", body: JSON.stringify(body) }),
  del: (path) => request(path, { method: "DELETE" }),

  // Mock auth for local dev (remove when integrating)
  async mockLogin({ email, password }) {
    if (!email || !password) throw new Error("Missing credentials");
    return {
      token: "mock-token",
      user: {
        id: "u1",
        name: "Demo User",
        email,
        role: email.includes("admin") ? "admin" : email.includes("instructor") ? "instructor" : "learner"
      }
    };
  },
  async mockSignup(payload) {
    return {
      token: "mock-token",
      user: {
        id: "u2",
        name: payload.name,
        email: payload.email,
        role: payload.role || "learner"
      }
    };
  }
};

export default api;