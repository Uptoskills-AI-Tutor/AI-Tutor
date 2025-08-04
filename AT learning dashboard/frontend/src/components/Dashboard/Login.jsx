import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";

import image from "../../assets/image.png";
import googleIcon from "../../assets/google-icon.png";
import facebookIcon from "../../assets/facebook-icon.png";
import appleIcon from "../../assets/apple-icon.png";

const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ text: "", type: "info" });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/app";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    try {
      setSubmitting(true);
      setToast({ text: "", type: "info" });

      const res = await axios.post("/api/auth/login", { email, password });

      if (!res.data?.token) {
        setToast({
          text: "No token returned by server. Check backend response.",
          type: "error",
        });
        return;
      }

      localStorage.setItem("token", res.data.token);
      setToast({ text: "Login successful! Redirecting…", type: "success" });

      setTimeout(() => navigate(from, { replace: true }), 500);
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage =
        err.response?.data?.message ||
        `Login failed (HTTP ${err.response?.status || "?"})`;
      setToast({ text: errorMessage, type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const toastClass =
    toast.type === "success"
      ? "text-green-700 bg-green-50 border border-green-200"
      : toast.type === "error"
      ? "text-red-700 bg-red-50 border border-red-200"
      : "text-blue-700 bg-blue-50 border border-blue-200";

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-50">
      <div className="hidden md:flex md:w-1/2 justify-center items-center p-4">
        <img src={image} alt="AI Learning" className="max-w-full h-auto rounded-lg" />
      </div>

      <div className="w-full md:w-1/2 max-w-md bg-white shadow rounded-lg p-6 text-gray-900">
        <h2 className="text-2xl font-semibold mb-2">Welcome Back!</h2>
        <p className="text-sm text-gray-600 mb-6">
          Log in to continue your AI learning journey.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              className="mt-1 w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400"
              type="email"
              id="email"
              name="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              className="mt-1 w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400"
              type="password"
              id="password"
              name="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <Link to="/forgot" className="text-blue-600 hover:underline">
              Forgot Password?
            </Link>
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-60"
          >
            {submitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {!!toast.text && (
          <p className={`mt-4 text-sm rounded-md px-3 py-2 ${toastClass}`} aria-live="polite">
            {toast.text}
          </p>
        )}

        <div className="mt-6 space-y-3">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100"
          >
            <img src={googleIcon} alt="Google" className="h-5 w-5" />
            Continue with Google
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800"
          >
            <img src={facebookIcon} alt="Facebook" className="h-5 w-5" />
            Continue with Facebook
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-md hover:bg-gray-800"
          >
            <img src={appleIcon} alt="Apple" className="h-5 w-5" />
            Continue with Apple
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;


