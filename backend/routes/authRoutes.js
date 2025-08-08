const express = require('express');
const router = express.Router();
<<<<<<< HEAD

=======
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5
const {
  registerValidationRules,
  loginValidationRules,
  forgotPasswordValidationRules,
<<<<<<< HEAD
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
=======
  validate
} = require('../middlewares/validation');
const {
  loginUser,
  registerUser,
  forgotPassword
} = require('../controllers/authController');

router.post('/login', loginValidationRules, validate, loginUser);
router.post('/register', registerValidationRules, validate, registerUser);
router.post('/forgot-password', forgotPasswordValidationRules, validate, forgotPassword);

module.exports = router;
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5
