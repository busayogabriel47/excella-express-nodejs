const express = require('express')
const router = express.Router();
const Cohort = require('../Model/cohort')
const adminAuth = require('../middleware/adminLogin')
const {createCohort} = require('../controller/CohortController')
const multerMiddlerware = require('../middleware/cohortBanner')

//Endpoint to add cohorts (accessible to admin only)
router.post('/add-cohort', adminAuth, multerMiddlerware.single('uploads'), createCohort)


module.exports = router