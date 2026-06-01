const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
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

// POST /api/auth/logout
router.post('/logout', logoutUser);

// GET /api/auth/me
router.get('/me', authenticateUser, getCurrentUser);

module.exports = router;
