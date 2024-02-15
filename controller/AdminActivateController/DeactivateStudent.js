// Example backend route for deactivating a student
const addStudent = require("../../Model/addStudent");

const deactivateStudent = async (req, res) => {
    const { studentId } = req.params;
  
    try {
      const updatedStudent = await addStudent.findByIdAndUpdate(
        studentId,
        { isActive: false },
        { new: true }
      );
  
      if (!updatedStudent) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      res.json({ message: 'Student deactivated successfully.' });
    } catch (error) {
      console.error('Error deactivating student:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  module.exports = { deactivateStudent };