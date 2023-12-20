const express = require('express');
const router = express.Router();
const fetchAllCohorts = require('../controller/fetchAllCohort')
const studentCohort = require('../controller/StudentCohort')
const studentAuth = require("../middleware/requireLogin")



router.get('/cohorts', fetchAllCohorts);
router.get("/student/:studentId", studentAuth, studentCohort);


module.exports = router
