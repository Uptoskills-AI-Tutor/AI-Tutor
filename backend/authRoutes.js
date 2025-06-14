const express = require('express');
const router = express.Router();
const {
  registerValidationRules,
  loginValidationRules,
  forgotPasswordValidationRules,
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