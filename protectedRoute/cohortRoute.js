const express = require('express')
const router = express.Router();
const Cohort = require('../Model/cohort')
const adminAuth = require('../middleware/adminLogin')
const {createCohort, updateCohort, deleteCohort} = require('../controller/CohortController')
const multerMiddleware = require('../middleware/cohortBanner')
const path = require("path")


//Endpoint to add cohorts (accessible to admin only)
router.post('/add-cohort', express.static(path.join(__dirname, 'uploads')), adminAuth, multerMiddleware, createCohort)
router.put('/update-cohort/:id', adminAuth, multerMiddleware, updateCohort)
router.delete('/delete-cohort/:id', deleteCohort)


module.exports = router