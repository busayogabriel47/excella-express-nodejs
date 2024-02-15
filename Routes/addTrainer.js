const express = require('express');
const create = require('../controller/addTrainer.js')
const requireLogin = require('../middleware/requireLogin')
const trainerDashboardbRoute = require("../protectedRoute/trainerRoute.js")

const router = express.Router();


router.post('/add-trainer', create.register)
router.post('/trainer-login', create.login)
router.post('/getTrainers', create.getTrainers)
router.post('/makeAttendance', requireLogin, create.makeAttendance)
router.post('/uploadMark', requireLogin, create.uploadMark)
router.post('/trainerProfile', create.trainerProfile)
router.put('/trainerPicUpdate', requireLogin, create.trainerPicUpdate)
router.post('/trainer/profileUpdate', create.trainerProfilUpdate)
router.get('/trainer-dashboard', trainerDashboardbRoute)

module.exports = router

