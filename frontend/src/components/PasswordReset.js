// frontend/src/components/PasswordReset.js
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Auth.css";

export default function PasswordReset() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    if (password.length < 6) return setStatus("Password must be at least 6 characters.");
    if (password !== confirm) return setStatus("Passwords do not match.");
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus(data.message || "Password reset successful. Redirecting to login...");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setStatus(data.message || "Invalid or expired token.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card small">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Set New Password"}
          </button>
        </form>
        {status && <p className="status">{status}</p>}
      </div>
    </div>
  );
}
