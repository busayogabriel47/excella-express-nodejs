const express = require('express')
const router = express.Router()
const create = require('../controller/admin')
const adminAuth = require("../middleware/adminLogin")
const {getPendingStudents} = require("../controller/AdminActivateController/Getpendingstudent")



  
router.post('/adminReg', create.regAdmin)


router.post('/adminSignin', create.loginAdmin)
router.get('/pending-students', adminAuth, getPendingStudents)




module.exports = router