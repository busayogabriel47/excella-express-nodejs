const express = require('express');
const create = require('../controller/trainerReg')


const router = express.Router();


router.post('/trainer', create.trainerReg)




module.exports = router

