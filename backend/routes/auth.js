const express = require('express');
const { loginUser, registerUser, logoutUser } = require('../controllers/authController');
const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser); // Add logout route

module.exports = router;
