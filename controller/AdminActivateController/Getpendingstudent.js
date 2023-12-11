const addStudent = require("../../Model/addStudent")


const getPendingStudents = async (req, res) => {
    try{
        const pendingStuden = await addStudent.find({isActive: false});
        res.json(pendingStuden)
    }catch (error){
        console.error('Error getting pending students:', error);
        res.status(500).json({error: 'Internal server error'})
    }
}

module.exports = {getPendingStudents}