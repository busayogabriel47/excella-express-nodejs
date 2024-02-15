// adminRoutes.js
const express = require('express');
const router = express.Router();
const {activateTrainer} = require('../../controller/AdminActivateController/trainerActivate');

// Admin activates a trainer
router.put('/activate-trainer/:trainerId', activateTrainer);

module.exports = router;