const addStudent = require("../../Model/addStudent");
const emailMiddleware = require("../../middleware/emailMiddleware");


const activateStudent = async(req, res) => {
    const { studentId } = req.params;
    const {cohortId} = req.body;

    console.log('Received studentId:', studentId);
  console.log('Received cohortId:', cohortId);
  
    try {

      const updatedStudent = await addStudent.findByIdAndUpdate(
        studentId,
        {isActive: true, cohort: cohortId},//Assign cohort to the student
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

    //send email notification to admin after student account activated
      req.sendEmail({
        from: "omotukabusayo22@gmail.com",
        to: 'arairegold1@gmail.com',
        subject: "New Registration",
        html: `A new user has registered for ${user.course}:
        Name: ${user.firstname} ${user.lastname}
        Email: ${user.email}
        Please activate the account.`
    })

      res.json({message: 'Student account activated successfully.'})
    } catch (error) {
      console.error('Error activating student:', error);
      res.status(500).json({ error: 'Internal server error' });
    }

  };


  module.exports = {activateStudent};