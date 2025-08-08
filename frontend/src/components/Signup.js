import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import image from "../assets/image.png";
import googleIcon from "../assets/google-icon.png";
import facebookIcon from "../assets/facebook-icon.png";
import appleIcon from "../assets/apple-icon.png";

const Signup = () => {
  const [formData, setFormData] = useState({
<<<<<<< HEAD
=======
    name: "",
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

<<<<<<< HEAD
=======
  // Handle input changes and update state
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

<<<<<<< HEAD
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
=======
  // Called when form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted!");  // Debug: confirm submit handler runs
    console.log("Submitting signup form:", formData); // Debug: check form data state

    // Basic validation example (optional)
    if (!formData.name || !formData.email || !formData.password) {
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5
      setMessage("Please fill in all fields.");
      return;
    }

    try {
<<<<<<< HEAD
      const res = await fetch("http://localhost:5000/api/auth/signup", {
=======
      const res = await fetch("http://localhost:3000/api/auth/signup", {
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

<<<<<<< HEAD
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Signup failed.");
      } else {
=======
      console.log("Response status:", res.status); // Debug: check HTTP status

      const data = await res.json();

      if (!res.ok) {
        console.error("Signup failed:", data.message);
        setMessage(data.message || "Signup failed.");
      } else {
        console.log("Signup success:", data);
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5
        setMessage("Signup successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
<<<<<<< HEAD
=======
      console.error("Signup error:", err);
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="container">
      <div className="image-section">
        <img src={image} alt="AI Learning" />
      </div>
<<<<<<< HEAD
      <div className="signup-section">
=======
      <div className="login-section">
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5
        <h2>Create Account</h2>
        <p>Join us and start your AI learning journey.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
<<<<<<< HEAD
=======
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5
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
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="forgot-signup">
            <span>Already have an account?</span>
            <Link to="/login">Log In</Link>
          </div>
          <button type="submit" className="login-btn">Sign Up</button>
        </form>
        <p style={{ color: "blue" }}>{message}</p>
        <div className="social-login">
          <button type="button" className="google-btn">
            <img src={googleIcon} alt="Google Logo" /> Sign up with Google
          </button>
          <button type="button" className="facebook-btn">
            <img src={facebookIcon} alt="Facebook Logo" /> Sign up with Facebook
          </button>
          <button type="button" className="apple-btn">
            <img src={appleIcon} alt="Apple Logo" /> Sign up with Apple
          </button>
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Signup;
=======
export default Signup;
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5
