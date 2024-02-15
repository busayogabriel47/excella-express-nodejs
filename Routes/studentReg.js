const express = require('express');
const create = require('../controller/studentReg')


const router = express.Router();


router.post('/learner', create.usersReg)




module.exports = router

