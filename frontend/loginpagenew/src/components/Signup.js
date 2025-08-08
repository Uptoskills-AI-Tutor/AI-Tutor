import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import image from "../assets/image.png";
import googleIcon from "../assets/google-icon.png";
import facebookIcon from "../assets/facebook-icon.png";
import appleIcon from "../assets/apple-icon.png";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dateOfBirth: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle input changes and update state
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Called when form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation example (optional)
    if (!formData.firstName || !formData.lastName || !formData.phoneNumber || !formData.dateOfBirth || !formData.email || !formData.password) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Signup failed.");
      } else {
        setMessage("Signup successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="container">
      <div className="image-section">
        <img src={image} alt="AI Learning" />
      </div>
      <div className="signup-section">
        <h2>Create Account</h2>
        <p>Join us and start your AI learning journey.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              autoComplete="given-name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              autoComplete="family-name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              required
              autoComplete="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              required
              autoComplete="bday"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
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
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="login-redirect">
            <span>Already have an account?</span>
            <Link to="/login">Log In</Link>
          </div>
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
        <p style={{ color: "blue" }}>{message}</p>
        <div className="social-signup">
          <button type="button" className="google-btn">
            <img src={googleIcon} alt="Google Logo" /> Sign up with Google
          </button>
          <button type="button" className="facebook-btn">
            <img src={facebookIcon} alt="Facebook Logo" /> Sign up with Github
          </button>
          <button type="button" className="apple-btn">
            <img src={appleIcon} alt="Apple Logo" /> Sign up with Apple
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
