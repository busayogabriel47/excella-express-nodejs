const express = require('express');
const router = express.Router();
const adminLogin = require('../middleware/adminLogin')



router.get('/admin-dashboard', adminLogin, (req, res) => {
    // Access the user information using req.user
    const { role } = req.user;
  
    if (role === 'admin' || role === 'superadmin') {
      // Only users with 'admin' or 'superadmin' roles can access this route
      res.json({ message: 'Admin dashboard accessed successfully' });
    } else {
      // Non-admin users are denied access
      res.status(403).json({ error: 'Unauthorized access' });
    }
  });
  
  module.exports = router;
