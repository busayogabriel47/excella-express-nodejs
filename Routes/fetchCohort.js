const express = require('express');
const router = express.Router();
const fetchAllCohorts = require('../controller/fetchAllCohort')




router.get('/cohorts', fetchAllCohorts);


module.exports = router
