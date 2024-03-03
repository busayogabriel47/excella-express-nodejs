const express = require('express');
const router = express.Router();
const { resetPassword } = require('../controller/newPassword');

// Route to handle password reset
router.post('/new-password', resetPassword);

module.exports = router;
