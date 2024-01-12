const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cohortSchema = new Schema({
    name: {type: String, required: true},
    formUrls: [{type: String}], 
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    banner: {type: String}
});


const Cohort = mongoose.model('Cohort', cohortSchema);

cohortSchema.method.addFormUrls = async function (formUrls){
    this.formUrls.push(...formUrls);
    return await this.save();
}


module.exports = Cohort