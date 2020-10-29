const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

router.post('/register', authController.signupUser);
router.post('/login', authController.loginUser);

module.exports = router;