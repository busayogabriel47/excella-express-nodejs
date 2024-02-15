const express = require('express')
const router = express.Router();

const {activateStudent, getActivatedStudent} = require('../../controller/AdminActivateController/StudentActivate')


//Route to activate a student account


router.put('/activate/:studentId', activateStudent)
router.get('/activated-students', getActivatedStudent)
router.put('/deactivate/:studentId', )

module.exports = router