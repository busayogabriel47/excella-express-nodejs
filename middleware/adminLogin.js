const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const adminModel = require('../Model/admin')

dotenv.config()


const isAdmin = async (req, res, next) => {
    const { authorization } = req.headers;
  
    // Authorization header should be present
    if (!authorization) {
      return res.status(401).json({ error: 'You must be logged in' });
    }
  
    const token = authorization.replace('Bearer ', '');
  
    // Verify the JWT token
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      if (err) {
        return res.status(401).json({ error: 'You must be logged in' });
      }
  
      const { _id } = payload;
  
      try {
        // Check if the user is an admin
        const userdata = await adminModel.findById(_id);
  
        if (!userdata) {
          return res.status(401).json({ error: 'You must be logged in' });
        }
  
        // Attach the user data to the request object
        req.userdata = userdata;
  
        // Check if the user is an admin or superadmin
        if (userdata.role === 'admin' || userdata.role === 'superadmin') {
          next();
        } else {
          return res.status(403).json({ error: 'Permission denied. Admin access required.' });
        }
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
    });
  };
  
  module.exports = isAdmin;