const express = require('express');
const router = express.Router();

const {
  registerValidationRules,
  loginValidationRules,
  forgotPasswordValidationRules,
  resetPasswordValidationRules,
  validate
} = require('../middlewares/validation');

const {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');

// Login
router.post('/login', loginValidationRules, validate, loginUser);

// Register
router.post('/register', registerValidationRules, validate, registerUser);

// Forgot Password
router.post('/forgot-password', forgotPasswordValidationRules, validate, forgotPassword);

// Reset Password
router.post('/reset-password/:token', resetPasswordValidationRules, validate, resetPassword);

module.exports = router;
