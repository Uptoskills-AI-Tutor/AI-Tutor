const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
<<<<<<< HEAD
const User = require("../models/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
=======
const passport = require("passport");
const User = require("../models/User");
const Admin = require("../models/Admin");
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "mySuperSecretKey123!@#";

<<<<<<< HEAD
// Signup
=======
// ------------------------
// 🔒 JWT User Signup Route
// ------------------------
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

<<<<<<< HEAD
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
=======
    const newUser = new User({ name, email, password }); // Password hashed in model
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

<<<<<<< HEAD
// Login
=======
// ----------------------
// 🔒 JWT User Login Route
// ----------------------
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

<<<<<<< HEAD
// Forgot Password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate token
    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `http://localhost:3000/reset-password/${token}`;
    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: "Password Reset",
      text: `Click this link to reset your password: ${resetUrl}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Reset link sent to your email." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reset Password
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
=======
// -------------------------
// 🔒 Admin Register (JWT)
// -------------------------
router.post("/admin/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ name, email, password: hashedPassword });
    await admin.save();
    res.status(201).json({ message: "Admin registered" });
  } catch (err) {
    res.status(500).json({ error: "Error registering admin" });
  }
});

// ----------------------
// 🔒 Admin Login (JWT)
// ----------------------
router.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, "secretKey", { expiresIn: "1d" });
    res.json({ token, admin });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

// =========================
// ✅ GitHub OAuth Routes
// =========================

// 🔁 Start GitHub login flow
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

// 🔄 GitHub callback
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:5173/dashboard"); // 🔁 Redirect after successful login
  }
);

// =========================
// ✅ Google OAuth Routes
// =========================

// 🔁 Start Google login flow
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 🔄 Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:5173/dashboard"); // 🔁 Redirect after successful login
  }
);

module.exports = router;
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5
