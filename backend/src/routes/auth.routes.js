const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require('../controllers/auth.controller');
const validateRequest = require('../middleware/validateRequest');
const {
  registerValidationRules,
  loginValidationRules,
} = require('../validations/auth.validation');

// POST /api/auth/register
router.post('/register', registerValidationRules, validateRequest, registerUser);

// POST /api/auth/login
router.post('/login', loginValidationRules, validateRequest, loginUser);

module.exports = router;
