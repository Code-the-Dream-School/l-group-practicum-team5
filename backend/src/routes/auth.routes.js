const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require('../controllers/auth.controller');
const authenticateUser = require('../middleware/auth.middleware');
const validateRequest = require('../middleware/validateRequest');
const {
  registerValidationRules,
  loginValidationRules,
} = require('../validations/auth.validation');

// POST /api/auth/register
router.post('/register', registerValidationRules, validateRequest, registerUser);

// POST /api/auth/login
router.post('/login', loginValidationRules, validateRequest, loginUser);

// GET /api/auth/me
router.get('/me', authenticateUser, getCurrentUser);

module.exports = router;
