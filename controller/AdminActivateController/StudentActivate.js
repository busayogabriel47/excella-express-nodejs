const addStudent = require("../../Model/addStudent");

const activateStudent = async(req, res) => {
    const { studentId } = req.params;
  
    try {
      const updatedStudent = await addStudent.findByIdAndUpdate(
        studentId,
        {isActive: true},
        {new: true}
      )

      if (!updatedStudent) {
        return res.status(404).json({ error: 'Student not found' });
      }

      res.json({message: 'Student account activated successfully.'})
    } catch (error) {
      console.error('Error activating student:', error);
      res.status(500).json({ error: 'Internal server error' });
    }

  };


  module.exports = {activateStudent};