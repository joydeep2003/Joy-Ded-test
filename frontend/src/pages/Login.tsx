import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/client";
import { setAuth } from "../auth/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.post("/auth/login", { email, password });
      setAuth(res.data.access_token);
      window.location.href = "/projects";
    } catch {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <motion.section
        className="auth-card glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <span className="brand-chip">TaskFlow</span>
        <h1 className="page-title">Welcome back</h1>
        <p className="page-subtitle">Sign in to continue tracking projects and tasks.</p>

        <div className="field-grid">
          <input
            className="text-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="text-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary-btn" onClick={handleLogin} disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </div>

        {error ? <p className="error-note">{error}</p> : null}

        <p className="auth-switch">
          <Link to="/">Home</Link> · New here? <Link to="/register">Create account</Link>
        </p>
      </motion.section>
    </main>
  );
}
