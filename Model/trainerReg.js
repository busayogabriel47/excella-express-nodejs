const mongoose = require('mongoose');
const {Schema} = mongoose;




let trainerSchema = new Schema({

    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true},
    education: {type: String, required: true},
    terms: {type: Boolean, required: true},
    contactmeans:{type: String, required: true},
    gender:{type: String, required: true}
    
}, {
    timestamps: true
})



module.exports = mongoose.model('trainerReg', trainerSchema);
