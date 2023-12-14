const Cohort = require('../Model/cohort');


//Create cohorts
const createCohort = async (req, res) => {
    try {
        const { name, formUrl, startDate, endDate } = req.body;

        // Validate request data
        if (!name || !formUrl || !startDate || !endDate) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Use the bannerMiddleware before processing the request
        bannerMiddleware(req, res, (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }

            // At this point, the file has been successfully uploaded (if provided)
            
            // Create new cohort document
            const newCohort = new Cohort({
                name,
                formUrl,
                startDate,
                endDate,
                banner: req.file ? req.file.path : undefined, // Attach the file path if available
            });

            // Save the cohort to the Database
            const savedCohort = newCohort.save();
            res.status(201).json({ message: 'Cohort created successfully.', cohort: savedCohort });
        });
    } catch (error) {
        console.error('Error creating cohort:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};



//update cohorts
const updateCohort = async () => {

}


//update cohorts
const deleteCohort = async () => {
    
}

module.exports = {createCohort}