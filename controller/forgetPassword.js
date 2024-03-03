const nodemailer = require('nodemailer');
const jwt= require('jsonwebtoken');
const User = require("../Model/addStudent")
const dotenv = require('dotenv')

dotenv.config()



const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.gmail,
      pass: process.env.pass
    }
  });

  



  const requestResetToken = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      //Generate otp (6-digit random number)
      const otp = Math.floor(100000 + Math.random() * 900000)

      const token = jwt.sign({ userId: user._id, otp }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log("Generated Token:", token)

    //Save OTP to user document
    user.otp = otp
    await user.save();
      
  
      const mailOptions = {
        from: 'omotukabusayo22@gmail.com',
        to: email,
        subject: 'Excella Password Reset request',
        html: `
        <p>Use this OTP ${otp}</p> to reset your password or </p>
        <p>Please click <a href="http://localhost:3000/reset-password/${token}">here</a> to reset your password.</p>
        `
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            return res.status(500).json({ message: 'Error sending email.' });
        }
        console.log('Email sent:', info.response);

        // Token is now accessible here and included in the response object
        res.status(200).json({ message: 'Password reset email sent successfully.', token });
    });
    
    } catch (error) {
      console.error('Error requesting reset token:', error);
      res.status(500).json({ message: 'Error requesting password reset. Please try again later.' });
    }
  };



  module.exports = {
    requestResetToken
  };