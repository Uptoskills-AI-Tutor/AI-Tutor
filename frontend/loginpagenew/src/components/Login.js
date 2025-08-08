import React, { useState } from "react";
import "./Login.css";
import image from "../assets/image.png";
import googleIcon from "../assets/google-icon.png";
import facebookIcon from "../assets/github-icon.png";
import appleIcon from "../assets/apple-icon.png";
const Login = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`Login successful! Token: ${data.token}`);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        // Redirect to dashboard after successful login
        setTimeout(() => {
          window.location.href = 'http://localhost:5173';
        }, 1000);
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("Error connecting to server");
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
            <input type="email" id="email" name="email" required autoComplete="email" />
          </div>
          <div className="input-box">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required autoComplete="current-password" />
          </div>
          <div className="forgot-signup">
            <a href="/forgot">Forgot Password?</a>
            <a href="/signup">Sign Up</a>
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p style={{ color: "blue" }}>{message}</p>
        <div className="social-login">
          <button type="button" className="google-btn"  onClick= {() => 
  window.open("http://localhost:5000/auth/google", "_self")}
>
            <img src={googleIcon} alt="Google Logo" /> Continue with Google
          </button>
          <button
  type="button"
  className="facebook-btn"
  onClick={() => window.open("http://localhost:5000/auth/github", "_self")}
>
  <img src={facebookIcon} alt="Github Logo" /> Continue with Github
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
