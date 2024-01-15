const express = require('express');
const router = express.Router();
const Student = require('../Model/addStudent');



const studentCohort = async(req, res) => {
    try {
        //Find the student by ID and populate the cohort field
        const student = await Student.findById(req.params.studentId).populate('cohort');
        console.log('Student:', student);
        if(!student){
            return res.status(404).json({error: 'Student not found'});
        }

        //Extract relevant infor about student...
        const studentInfo = {
            _id: student._id,
            name: student.name,
            email: student.email
        }

        const cohorts = student.cohort ?[
            { 
                _id: student.cohort._id,
                name: student.cohort.name,
                startDate: student.cohort.startDate,
                endDate: student.cohort.endDate,
                formUrls: student.cohort.formUrls,
                banner: student.cohort.banner
            }
        ]
            : [];

        console.log('Cohorts:', cohorts);

        res.json({student: studentInfo, cohorts})
    } catch (error) {
        console.error('Error fetching student and cohorts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = studentCohort;