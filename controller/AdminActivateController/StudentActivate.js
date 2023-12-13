const addStudent = require("../../Model/addStudent");
const emailMiddleware = require("../../middleware/emailMiddleware");



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

      //Send email to students after account activated successfully
      emailMiddleware(req, res, ()=> {
          req.sendEmail({
            from: "omotukabusayo22@gmail.com",
            to: updatedStudent.email,
            subject: "Excella Account Actvation",
            html: `Hello ${updatedStudent.firstname} ${updatedStudent.lastname} Your Excella account has been successfully activated`
          })
      })

      res.json({message: 'Student account activated successfully.'})
    } catch (error) {
      console.error('Error activating student:', error);
      res.status(500).json({ error: 'Internal server error' });
    }

  };


  module.exports = {activateStudent};