import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

import uptoskillsLogo from "../../assets/Uptoskills.png";
import robotImage from "../../assets/Robot.jpg";
import googleIcon from "../../assets/google-icon.png";
import appleIcon from "../../assets/apple-icon.png";

const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ text: "", type: "info" });
  const [showPassword, setShowPassword] = useState(false);

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
      ? "text-green-800 bg-green-100 border border-green-300"
      : toast.type === "error"
      ? "text-red-800 bg-red-100 border border-red-300"
      : "text-blue-800 bg-blue-100 border border-blue-300";

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      <div className="flex flex-col justify-center items-start md:w-1/2 pl-16 pr-12 lg:pl-24 lg:pr-20 py-12">
        <img src={uptoskillsLogo} alt="Uptoskills Logo" className="h-14 mb-8" />
        <h1 className="text-5xl font-extrabold leading-tight text-gray-900">
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            AI Learning
          </span>{" "}
          Platform
        </h1>
        <p className="mt-6 text-gray-600 text-lg max-w-md leading-relaxed">
          Unlock the future of education with AI-powered courses designed to
          accelerate your learning journey.
        </p>
        <img
          src={robotImage}
          alt="AI Robot"
          className="mt-10 max-w-md rounded-xl shadow-lg"
        />
      </div>

      <div className="flex flex-col justify-center md:w-1/2 bg-gray-50 p-10 lg:p-16">
        <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Welcome Back
          </h2>
          <p className="text-base text-gray-600 text-center mb-8">
            Access your AI learning journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email Address
              </label>
              <input
                className="mt-2 w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-500"
                type="email"
                id="email"
                name="email"
                required
                autoComplete="email"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <div className="relative mt-2">
                <input
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-500 pr-12"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-700">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded text-blue-600 focus:ring-blue-500"
                  defaultChecked
                />
                Keep me logged in
              </label>
              <Link
                to="/forgot"
                className="text-blue-600 font-medium hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-blue-500 to-green-400 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-60"
            >
              {submitting ? "Logging in..." : "Log In"}
            </button>
          </form>

          {!!toast.text && (
            <p
              className={`mt-5 text-sm rounded-md px-4 py-3 ${toastClass}`}
              aria-live="polite"
            >
              {toast.text}
            </p>
          )}

          <div className="mt-8 space-y-4">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 border border-gray-300 text-gray-800 py-3 rounded-lg shadow-sm hover:bg-gray-50 transition"
            >
              <img src={googleIcon} alt="Google" className="h-5 w-5" />
              Continue with Google
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 bg-black text-white py-3 rounded-lg shadow-sm hover:bg-gray-800 transition"
            >
              <img src={appleIcon} alt="Apple" className="h-5 w-5" />
              Continue with Apple
            </button>
          </div>

          <p className="text-sm text-center mt-8 text-gray-700">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;



