// src/components/dashboard/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api/auth";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.email || !form.password) return "Email & password are required";
    if (form.password.length < 6) return "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword) return "Passwords do not match";
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    try {
      setLoading(true);
      const res = await signup({
        name: form.name || "User",
        email: form.email,
        password: form.password,
      });

      setSuccessMsg(res.data?.message || "Signup successful!");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Signup failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={onSubmit} style={styles.form}>
        <h2 style={styles.title}>Create Account</h2>

        {error && <p style={styles.error}>{error}</p>}
        {successMsg && <p style={styles.success}>{successMsg}</p>}

        <label style={styles.label}>Name</label>
        <input
          style={styles.input}
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={onChange}
        />

        <label style={styles.label}>Email</label>
        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={onChange}
        />

        <label style={styles.label}>Password</label>
        <div style={styles.passwordWrapper}>
          <input
            style={styles.input}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Min 6 characters"
            value={form.password}
            onChange={onChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            style={styles.toggleBtn}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <label style={styles.label}>Confirm Password</label>
        <input
          style={styles.input}
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Re-enter password"
          value={form.confirmPassword}
          onChange={onChange}
        />

        <button type="submit" style={styles.submit} disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p style={styles.footerText}>
          Already have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/login")}>
            Log in
          </span>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#eef2f7",
    padding: 20,
  },
  form: {
    width: "100%",
    maxWidth: 480,
    background: "#ffffff",
    borderRadius: 10,
    padding: "32px 24px",
    boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    textAlign: "center",
    marginBottom: 24,
    color: "#111827",
  },
  label: {
    display: "block",
    marginTop: 14,
    marginBottom: 6,
    fontWeight: 600,
    fontSize: 14,
    color: "#374151",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 14,
    outline: "none",
    color: "#111827", // 👈 Text color for visibility
    backgroundColor: "#fff", // ensure background is white
    transition: "border 0.2s",
  },
  passwordWrapper: {
    position: "relative",
  },
  toggleBtn: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    color: "#2563eb",
    cursor: "pointer",
    fontWeight: 500,
  },
  submit: {
    width: "100%",
    marginTop: 24,
    padding: "12px",
    borderRadius: 8,
    border: "none",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    fontWeight: 600,
    fontSize: 16,
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  error: {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: "10px 14px",
    borderRadius: 6,
    marginBottom: 16,
  },
  success: {
    background: "#d1fae5",
    color: "#047857",
    padding: "10px 14px",
    borderRadius: 6,
    marginBottom: 16,
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    textAlign: "center",
  },
  link: {
    color: "#2563eb",
    cursor: "pointer",
    fontWeight: 500,
  },
};
 