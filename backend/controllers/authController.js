<<<<<<< HEAD
// backend/controllers/authController.js
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/User");

// helper: transporter (Gmail example)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // use App Password for Gmail
  },
});

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const user = await User.findOne({ email });
    if (!user) {
      // do not reveal existence
      return res.status(200).json({ message: "If that email exists, a reset link has been sent" });
    }

    // create token and store hashed
    const token = crypto.randomBytes(32).toString("hex");
    const hashed = crypto.createHash("sha256").update(token).digest("hex");

    user.resetToken = hashed;
    user.resetTokenExpiry = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password reset",
      html: `<p>You requested a password reset. Click the link below to set a new password:</p>
             <a href="${resetUrl}">${resetUrl}</a>
             <p>If you didn't request this, ignore this email.</p>`,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ message: "Reset link sent to your email" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    if (!token) return res.status(400).json({ message: "Token missing" });

    const hashed = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetToken: hashed,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = password; // pre('save') will hash it
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    return res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
=======
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper function for generating JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// ✅ Login
const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

// ✅ Register
const registerUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const user = new User({
      firstName: req.body.firstName,
      middleName: req.body.middleName || '',
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      dateOfBirth: req.body.dateOfBirth,
      email: req.body.email,
      password: hashedPassword,
      platform: req.body.platform || 'Email & Password'
    });

    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      },
      message: 'User registered successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

// ✅ Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.newPassword, 12);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error during password reset'
    });
  }
};

module.exports = { loginUser, registerUser, forgotPassword };
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5
