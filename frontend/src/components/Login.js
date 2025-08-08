import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import image from "../assets/image.png";
import googleIcon from "../assets/google-icon.png";
import facebookIcon from "../assets/facebook-icon.png";
import appleIcon from "../assets/apple-icon.png";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
<<<<<<< HEAD
      const res = await fetch("http://localhost:5000/api/auth/login", {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
=======
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Login successful!");
<<<<<<< HEAD
        // You can store token in localStorage and redirect if needed
=======
        // Redirect or store token if using authentication
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (error) {
      setMessage("Error connecting to server.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="container">
      <div className="image-section">
        <img src={image} alt="AI Learning" />
      </div>
      <div className="login-section">
        <h2>Welcome Back!</h2>
        <p>Log in to continue your AI learning journey.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="forgot-signup">
<<<<<<< HEAD
            <Link to="/forgot-password">Forgot Password?</Link>
=======
            <Link to="/forgot">Forgot Password?</Link>
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5
            <Link to="/signup">Sign Up</Link>
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p style={{ color: "blue" }}>{message}</p>
        <div className="social-login">
          <button type="button" className="google-btn">
            <img src={googleIcon} alt="Google Logo" /> Continue with Google
          </button>
          <button type="button" className="facebook-btn">
            <img src={facebookIcon} alt="Facebook Logo" /> Continue with Facebook
          </button>
          <button type="button" className="apple-btn">
            <img src={appleIcon} alt="Apple Logo" /> Continue with Apple
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
