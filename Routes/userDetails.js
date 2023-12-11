const express = require('express');
const router = express.Router();
const userDetails = require('../controller/userDetails');

// Add middleware for authentication if needed

router.get('/getUserDetails', userDetails.getUserDetails);


module.exports = router;