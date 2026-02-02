import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import PageWrapper from "../components/PageWrapper";
import { loginAdmin } from "../firebase/auth";

export default function AdminLogin() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      setLoading(true);
      await loginAdmin(email, password);
      nav("/upload");
    } catch {
      setErr("Invalid admin credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="admin-wrap">
        <motion.div
          className="admin-card"
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="admin-top">
            <div className="admin-badge">🔒 Secure Access For My Love Victoria💕</div>
            <h2 className="admin-title">Admin Login</h2>
            <p className="admin-sub">
              Login to upload, manage and delete gallery photos.
            </p>
          </div>

          <form className="admin-form" onSubmit={submit}>
            {/* Email */}
            <div className="admin-field">
              <label>Email</label>
              <div className="admin-input">
                <span className="admin-icon">📧</span>
                <input
                  type="email"
                  placeholder="model@admin.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="admin-field">
              <label>Password</label>
              <div className="admin-input">
                <span className="admin-icon">🔑</span>
                <input
                  type="password"
                  autoComplete="current-password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {err && (
              <motion.div
                className="admin-error"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ❌ {err}
              </motion.div>
            )}

            <button className="admin-btn" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </button>

            <div className="admin-hint">
              {/* Login uses Firebase Authentication (Email/Password). */}
            </div>
          </form>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
