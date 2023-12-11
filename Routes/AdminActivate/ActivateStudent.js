const express = require('express')
const router = express.Router();

const {activateStudent} = require('../../controller/AdminActivateController/StudentActivate')


//Route to activate a student account

router.put('/activate/:studentId', activateStudent)