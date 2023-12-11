const addStudent = require("../../Model/addStudent");

const activateStudent = (req, res) => {
    const { studentId } = req.params;
  
    addStudent.findByIdAndUpdate(
      studentId,
      { isActive: true },
      { new: true },
      (err, activatedStudent) => {
        if (err || !activatedStudent) {
          return res.status(500).json({ error: 'Unable to activate student account.' });
        }
  
        res.json({ message: 'Student account activated successfully.' });
      }
    );
  };


  module.exports = activateStudent;