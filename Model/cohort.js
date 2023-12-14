const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cohortSchema = new Schema({
    name: {type: String, required: true},
    formUrl: {type: String, required: true}, 
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    banner: {type: String}
});


const Cohort = mongoose.model('Cohort', cohortSchema);


module.exports = Cohort