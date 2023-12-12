const express = require('express');
const create = require('../controller/addStudent.js')
const studentAuth = require('../middleware/requireLogin')



const router = express.Router();


router.post('/addStudent', create.register)
router.post('/loginStudent', studentAuth, create.login)
router.post('/getStudentByCohort', create.getStudentByCohort)
router.post('/getAllStudent', create.getAllStudents)
router.post('/makeAttdance', create.makeAttdance)
router.post('/uploadMark', create.uploadMark)
router.post('/studentProfile', create.studentProfile)
router.post('/updateStuPic', studentAuth, create.updateStuPic)
router.post('/updateStuProfile', create.studentProfile)


module.exports = router

