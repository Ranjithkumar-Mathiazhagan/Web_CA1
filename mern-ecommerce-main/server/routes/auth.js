const express = require('express');
const router = express.Router();
const { registerUser, verifyOTP, signInUser } = require('../controllers/authController');

router.post('/register', registerUser);

router.post('/verify', verifyOTP);

router.post('/signin', signInUser);

module.exports = router;
