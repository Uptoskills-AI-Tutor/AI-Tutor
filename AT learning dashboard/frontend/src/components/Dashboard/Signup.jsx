// src/components/dashboard/Signup.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../../api/auth";

import uptoskillsLogo from "../../assets/Uptoskills.png";
import robotImage from "../../assets/Robot.jpg";
import googleIcon from "../../assets/google-icon.png";
import appleIcon from "../../assets/apple-icon.png";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!form.email || !form.username || !form.password) {
      setError("All fields are required");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      setLoading(true);
      const res = await signup(form);
      setSuccessMsg(res.data?.message || "Signup successful!");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      const msg = err.response?.data?.message || "Signup failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

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
            Join Us Today!
          </h2>
          <p className="text-base text-gray-600 text-center mb-6">
            Create your account for an enhanced experience at your fingertips.
          </p>

          {error && (
            <p className="mb-3 text-sm text-red-800 bg-red-100 border border-red-300 px-3 py-2 rounded-md">
              {error}
            </p>
          )}
          {successMsg && (
            <p className="mb-3 text-sm text-green-800 bg-green-100 border border-green-300 px-3 py-2 rounded-md">
              {successMsg}
            </p>
          )}

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-800">
                Email Address
              </label>
              <input
                className="mt-2 w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-500"
                type="email"
                name="email"
                placeholder="Enter your email here"
                value={form.email}
                onChange={onChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800">
                Choose a Username
              </label>
              <input
                className="mt-2 w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-500"
                type="text"
                name="username"
                placeholder="Enter your username here"
                value={form.username}
                onChange={onChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800">
                Create a Password
              </label>
              <div className="relative">
                <input
                  className="mt-2 w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-500 pr-10"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Minimum 8 characters required"
                  value={form.password}
                  onChange={onChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 text-sm"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <p className="text-xs text-gray-700 mt-1">
                🔒 Minimum 8 characters required
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-green-400 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-8 space-y-4">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 border border-gray-300 text-gray-800 py-3 rounded-lg shadow-sm hover:bg-gray-50 transition"
            >
              <img src={googleIcon} alt="Google" className="h-5 w-5" />
              Sign in with Google
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 bg-black text-white py-3 rounded-lg shadow-sm hover:bg-gray-800 transition"
            >
              <img src={appleIcon} alt="Apple" className="h-5 w-5" />
              Sign in with Apple
            </button>
          </div>

          <p className="text-sm text-center mt-8 text-gray-700">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Log In!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

 
