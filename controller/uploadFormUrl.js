const Cohort = require('../Model/cohort')



const addFormUrlToCohort = async (req, res) => {
    try{
        const {cohortId} = req.params;
        const {formUrl} = req.body;

        //Validate request data
        if(!cohortId || !formUrl){
            return res.status(400).json({error: 'Invalid request data.'});
        }

        //Find the cohort by ID
        const cohort = await Cohort.findById(cohortId)

        if(!cohort){
            return res.status(404).json({error: 'Cohort not found'})
        }

        //Add the individual form URL to the cohort
        cohort.formUrls.push(formUrl);
        await cohort.save();

        res.status(200).json({message: 'Form URL added to the cohort successfully'})
    }catch(error){
        console.error('Error adding form URL to cohort:', error);
        res.status(500).json({error: 'Internal server error'})
    }
}

module.exports = addFormUrlToCohort;