const { body, validationResult } = require('express-validator');
<<<<<<< HEAD

// Validation rules
const registerValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const loginValidationRules = [
  body('email').isEmail().withMessage('Valid email is required'),
=======
const User = require('../models/User');

// Common validation rules
const registerValidationRules = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email')
    .isEmail().withMessage('Invalid email')
    .custom(async email => {
      const user = await User.findOne({ email });
      if (user) throw new Error('Email already in use');
    }),
  body('phoneNumber').notEmpty().withMessage('Phone number is required'),
  body('dateOfBirth').isDate().withMessage('Invalid date of birth'),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character')
];

const loginValidationRules = [
  body('email').isEmail().withMessage('Invalid email'),
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5
  body('password').notEmpty().withMessage('Password is required')
];

const forgotPasswordValidationRules = [
<<<<<<< HEAD
  body('email').isEmail().withMessage('Valid email is required')
];

const resetPasswordValidationRules = [
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

// Middleware to handle validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
=======
  body('email').isEmail().withMessage('Invalid email'),
  body('newPassword')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
  
  return res.status(422).json({
    success: false,
    errors: extractedErrors
  });
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5
};

module.exports = {
  registerValidationRules,
  loginValidationRules,
  forgotPasswordValidationRules,
<<<<<<< HEAD
  resetPasswordValidationRules,
  validate
};
=======
  validate
};
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5
