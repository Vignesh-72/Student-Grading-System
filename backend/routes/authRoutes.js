const express = require('express');
const router = express.Router();

// Update the import to include loginUser
const { registerUser, loginUser } = require('../controllers/authController');

// POST /api/auth/register
router.post('/register', registerUser);

// POST /api/auth/login
router.post('/login', loginUser); // Add this line

module.exports = router;