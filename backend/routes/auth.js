const express = require('express');
const { loginUser, registerUser } = require('../controllers/authController');
const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser); // Ensure this line is present

module.exports = router;
