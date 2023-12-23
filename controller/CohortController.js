const Cohort = require('../Model/cohort');
const multerMiddleware = require("../middleware/cohortBanner")

//Create cohorts
const createCohort = async (req, res) => {
    try {

      // Access the Cloudinary URL from req.file.cloudinaryUrl
      const cloudinaryUrl = req.file ? req.file.cloudinaryUrl : null;

        console.log('Received cohort creation request:', req.body);


        const { name, formUrl, startDate, endDate, banner} = req.body;


        // Validate request data
        if (!name || !formUrl || !startDate || !endDate || !banner) {
            return res.status(400).json({ error: 'All fields are required.' });
        }


        console.log('Cohort data after bannerMiddleware:', req.body);

            // At this point, the file has been successfully uploaded (if provided)
            
            // Create new cohort document
            const newCohort = new Cohort({
                name,
                formUrl,
                startDate,
                endDate,
                banner: cloudinaryUrl, //Use the Cloudinary URL for the banner
            });

            // Save the cohort to the Database
            const savedCohort = await newCohort.save();
            res.status(201).json({ message: 'Cohort created successfully.', cohort: savedCohort });
    } catch (error) {
        console.error('Error creating cohort:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};



//update cohorts
const updateCohort = async (req, res) => {
    try {
      const { name, formUrl, startDate, endDate } = req.body;
  
      // Use the bannerMiddleware before processing the request
      multerMiddleware(req, res, async (err) => {
        if (err) {
          console.error('Error uploading file:', err);
          return res.status(400).json({ error: err.message });
        }
  
        // At this point, the file has been successfully uploaded (if provided)
  
        const updatedCohort = await Cohort.findByIdAndUpdate(
          req.params.id,
          {
            name,
            formUrl,
            startDate,
            endDate,
            banner: req.file ? req.file.path : undefined, // Attach the file path if available
          },
          { new: true }
        );
        res.json({ message: 'Cohort updated successfully', updatedCohort });
        console.log('Cohort ID:', req.params.id);
        console.log('Uploaded File:', req.file);
      });
    } catch (error) {
      console.error('Error updating cohort:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  };


//Delete cohorts
const deleteCohort = async (req, res) => {
    try {
        const deletedCohort = await Cohort.findByIdAndRemove(req.params.id)
        res.json(deletedCohort)
    } catch (error) {
        console.error('Error updating cohort:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

module.exports = {createCohort, updateCohort, deleteCohort}