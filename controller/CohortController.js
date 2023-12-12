const Cohort = require('../Model/cohort');

const createCohort = async(req, res) => {
    try{
        const {name, formUrl, startDate, endDate} = req.body;

        //Validate request data
        if(!name || !formUrl || !startDate || !endDate){
            return res.status(400).json({ error: 'All fields are required.' });
        }

        //Create new cohort document
        const newCohort = new Cohort({
            name, formUrl, startDate, endDate
        })

        //Save the cohort to the Database
        const savedCohort = await newCohort.save()
        res.status(201).json({message: 'Cohort created successfully.', cohort: savedCohort})

    }catch(error){
        console.error('Error creating cohort:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

module.exports = {createCohort}