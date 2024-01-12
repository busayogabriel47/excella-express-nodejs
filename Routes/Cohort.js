const express = require('express');
const router = express.Router();
const fetchAllCohorts = require('../controller/fetchAllCohort')
const studentCohort = require('../controller/StudentCohort')
const studentAuth = require("../middleware/requireLogin")
const adminAuth = require("../middleware/adminLogin")
const addFormUrlToCohort = require('../controller/uploadFormUrl')


router.get('/cohorts', fetchAllCohorts);
router.get("/student/:studentId", studentAuth, studentCohort);
router.post('/cohorts/:cohortId/add-form-url', adminAuth, addFormUrlToCohort)

module.exports = router
