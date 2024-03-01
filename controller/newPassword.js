const jwt = require('jsonwebtoken')





const resetPassword = async (req, res) => {

    const { token, newPassword, confirmPassword } = req.body;
  
    try {
      // Verify token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  
      // Check if newPassword and confirmPassword match
      if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match.' });
      }
  
      // Update user's password
      const user = await User.findById(decodedToken.userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Set new password
      user.password = newPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password reset successful.' });
    } catch (error) {
      console.error('Error resetting password:', error);
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        return res.status(400).json({ message: 'Invalid or expired token.' });
      }
      res.status(500).json({ message: 'Error resetting password. Please try again later.' });
    }
  };
  
  module.exports = {
    resetPassword
  };
  