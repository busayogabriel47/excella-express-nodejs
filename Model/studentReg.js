const mongoose = require('mongoose');
const {Schema} = mongoose;



let userSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true},
    course: {type: String, required: true},
    terms: {type: Boolean, required: true},
    contactmeans:{type: String, required: true}
}, {
    timestamps: true
})



module.exports = mongoose.model('registration', userSchema);
