// adminRoutes.js
const express = require('express');
const router = express.Router();
const {deactivateStudent} = require('../../controller/AdminActivateController/DeactivateStudent');

// Admin activates a trainer
router.put('/deactivate-student/:studentId', deactivateStudent);

module.exports = router;