const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/User");
const Admin = require("../models/Admin");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "mySuperSecretKey123!@#";

// ------------------------
// 🔒 JWT User Signup Route
// ------------------------
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ name, email, password }); // Password hashed in model
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ----------------------
// 🔒 JWT User Login Route
// ----------------------
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
