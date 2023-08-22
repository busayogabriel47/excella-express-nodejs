const express = require('express');
const create = require('../controller/addStudent.js')
const requireLogin = require('../middleware/requireLogin.js');


const router = express.Router();


router.post('/addStudent', create.register)
router.post('/loginStudent', create.login)
router.post('/getStudentByCohort', create.getStudentByCohort)
router.post('/getAllStudent', create.getAllStudents)
router.post('/makeAttdance', create.makeAttdance)
router.post('/uploadMark', create.uploadMark)
router.post('/studentProfile', create.studentProfile)
router.post('/updateStuPic', requireLogin, create.updateStuPic)
router.post('/updateStuProfile', create.studentProfile)


module.exports = router

