const express = require('express');
const router = express.Router();
const Cohort = require('../Model/cohort');



const fetchAllCohorts = async (req, res) => {
    try {
      const cohorts = await Cohort.find();
      res.json(cohorts);
    } catch (error) {
      console.error('Error fetching cohorts:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

module.exports = fetchAllCohorts;