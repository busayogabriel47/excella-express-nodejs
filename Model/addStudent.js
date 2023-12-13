const mongoose = require('mongoose');
const {Schema} = mongoose;


let userSchema = new Schema({
    firstname: {type: String},
    lastname: {type: String},
    email: {type: String},
    password: {type: String},
    dob: {type: String},
    course: {type: String},
    phone: {type: Number},
    role: {
        type: String,
        default: 'student',
    },
    cohort: {type: mongoose.Schema.Types.ObjectId, ref: 'Cohort'},
    isActive: {type: Boolean, default: false}
})


module.exports = mongoose.model('students', userSchema);
