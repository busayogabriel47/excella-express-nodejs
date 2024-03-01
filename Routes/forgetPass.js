const express = require('express');
const router = express.Router();


const forgetPass = require('../controller/forgetPassword');


router.post('/reset-password/request-token', forgetPass.requestResetToken);



module.exports = router;
