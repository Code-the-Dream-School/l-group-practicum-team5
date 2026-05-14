const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require('../controllers/auth.controller');
const authenticateUser = require('../middleware/auth.middleware');

// POST /api/auth/register
router.post('/register', registerUser);

// POST /api/auth/login
router.post('/login', loginUser);

// GET /api/auth/me
router.get('/me', authenticateUser, getCurrentUser);

module.exports = router;
