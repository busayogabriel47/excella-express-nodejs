const User = require('../Routes/addStudent');
const Cohort = require('../Model/cohort');


const getUserDetails = async(req, res)=> {
    try {
        const userId = req.user._id

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        const cohort = await Cohort.findById(user.cohort);

        if(!cohort){
            return res.status(404).json({message: 'Cohort not found'})
        }

        res.status(200).json({user, cohort});
    } catch (error) {
        console.error('Error fetching user details', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


module.exports = {getUserDetails}