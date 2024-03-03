const User = require('../Model/addStudent');
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
const bcrypt = require('bcryptjs')

dotenv.config()





const resetPassword = async (req, res) => {

    const { otp, newPassword, confirmPassword } = req.body;
  
    try {
      // Verify token
      const decodedToken = jwt.verify(otp, process.env.JWT_SECRET);
      console.log('Decoded token:', decodedToken);


      // Check if newPassword and confirmPassword match
      if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match.' });
      }
  
      // Update user's password
      const user = await User.findById(decodedToken.userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(newPassword, salt);

      // Update user password and clear otp
      user.password = hashedPass;
      user.otp = null;
      await user.save();


  
      res.status(200).json({ message: 'Password reset successful.' });
    } catch (error) {
      console.error('Error resetting password:', error);
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        return res.status(400).json({ message: 'Invalid or expired token.' });
      } else if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Password complexity requirements not met.' });
      }
      res.status(500).json({ message: 'Error resetting password. Please try again later.' });
    }
  };
  
  module.exports = {
    resetPassword
  };
  