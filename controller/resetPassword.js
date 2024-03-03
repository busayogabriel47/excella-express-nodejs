const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Model/addStudent');
const dotenv = require('dotenv')

dotenv.config();


const resetPassword = async(req, res) => {

    const {otp} = req.body;

    try{
        const decoded = jwt.verify(otp, process.env.JWT_SECRET);
        const {userId, otp:decodedOTP} = decoded

        console.log('Decoded token:', decoded);


        //Check if user exists
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }

        //Extract OTP from the user object
        // Convert user.otp to a number for comparison
        const userOTP = parseInt(user.otp);

        console.log(user.otp)

        //verify otp
        if(userOTP !== decodedOTP){
            return res.status(400).json({message: 'Invalid OTP.'})
        }


        //Clear OTP after successful verification
        user.otp = null;
        await user.save()
        

        res.status(200).json({message: 'OTP verify successfully'})
    }catch(error){
        console.log('Error verifying OTP:', error);
        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({ message: 'OTP token has expired' });
        }
        res.status(500).json({message: 'Error verifying OTP. Please try again later'})
    }
};


module.exports = {
    resetPassword
}