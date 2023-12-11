const express = require('express');
const router = express.Router();
const trainerLogin = require('../middleware/Tlogin');

// Trainer dashboard route
const trainerDashboardbRoute = ('/dashboard', trainerLogin, (req, res) => {
  const { isActive } = req.user;

  if (isActive) {
    // Only active trainers can access the dashboard
    res.json({ message: 'Trainer dashboard accessed successfully' });
  } else {
    // Inactive trainers are denied access
    res.status(403).json({ error: 'Unauthorized access' });
  }
});

module.exports = trainerDashboardbRoute;