// adminController.js
const trainerModel = require('../../Model/addTrainer');

const activateTrainer = (req, res) => {
  const trainerId = req.params.trainerId; // Get trainerId from request params

  // Find the trainer by ID and update isActive field to true
  trainerModel.findByIdAndUpdate(trainerId, { isActive: true }, { new: true })
    .then(updatedTrainer => {
      if (!updatedTrainer) {
        return res.status(404).json({ error: "Trainer not found" });
      }

      res.json({ message: "Trainer activated successfully" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
};

module.exports = { activateTrainer };