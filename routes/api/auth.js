const express = require('express');
const router = express.Router();
const AuthController = require('../../Controllers/authController');


router.route('/')
.post(AuthController.handleLogin);

module.exports = router;